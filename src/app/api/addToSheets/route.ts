import { subHours } from "date-fns";
import { google, sheets_v4 } from "googleapis";
import { z } from "zod";

const SheetDataSchema = z.object({
  sessionId: z.string().min(1, "sessionId is required"),
  subject: z.string().min(1, "subject is required"),
  assignmentId: z.string().min(1, "assignmentId is required"),
  isCorrect: z.boolean(),
  timeSpent: z.number().nonnegative("timeSpent must be a non-negative number"),
  attemptCount: z.number().int().positive(),
});

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = process.env.GOOGLE_SHEET_NAME!;
const CLIENT_EMAIL = process.env.GOOGLE_AUTH_CLIENT_EMAIL!;
const PRIVATE_KEY = process.env.GOOGLE_AUTH_PRIVATE_KEY!;
const EXPECTED_HEADERS = [
  "session_id",
  "subject",
  "assignment_id",
  "is_correct",
  "time_spent",
  "attempt_count",
  "attempt_timestamp",
];

// -- Helper functions --
function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;

  const allowedPatterns = [
    /^http:\/\/localhost:\d+$/, // localhost: any port
    /^https:\/\/cg-lab(-[\w\d]+)?\.vercel\.app$/, // production and previews
  ];

  return allowedPatterns.some(pattern => pattern.test(origin));
}

function areEnvVarsMissing(): boolean {
  return !SHEET_ID || !SHEET_NAME || !CLIENT_EMAIL || !PRIVATE_KEY;
}

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

async function ensureSheetHeaders(sheets: sheets_v4.Sheets) {
  const headersRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A1:G1`,
  });

  const currentHeaders = headersRes.data.values?.[0] || [];
  const headersMatch = EXPECTED_HEADERS.every(
    (h, i) => currentHeaders[i] === h
  );

  if (!headersMatch || currentHeaders.length !== EXPECTED_HEADERS.length) {
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:G1`,
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:G1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [EXPECTED_HEADERS],
      },
    });
  }
}

async function appendSheetData(
  sheets: sheets_v4.Sheets,
  data: z.infer<typeof SheetDataSchema>
) {
  const attemptTimestamp = subHours(new Date(), 3).toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${SHEET_NAME}!A:G`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          data.sessionId,
          data.subject,
          data.assignmentId,
          data.isCorrect,
          data.timeSpent,
          data.attemptCount,
          attemptTimestamp,
        ],
      ],
    },
  });
}

// -- Main handler --
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    console.log("Disallowed origin:", origin);
    return new Response("Origin not allowed", { status: 403 });
  }

  if (areEnvVarsMissing()) {
    console.error("Missing Google Sheets environment variables");
    return new Response("Missing environment variables", { status: 500 });
  }

  let parsedData;
  try {
    const rawData = await request.json();
    parsedData = SheetDataSchema.parse(rawData);
  } catch (error) {
    const message =
      error instanceof z.ZodError ? "Invalid data" : "Invalid JSON";
    console.error(message + ":", error);
    return new Response(message, { status: 400 });
  }

  try {
    const sheets = await getGoogleSheetsClient();

    const { data: spreadsheetData } = await sheets.spreadsheets.get({
      spreadsheetId: SHEET_ID,
    });

    const sheetExists = spreadsheetData.sheets?.some(
      s => s.properties?.title === SHEET_NAME
    );

    if (!sheetExists) {
      console.error("Sheet not found:", SHEET_NAME);
      return new Response("Sheet not found", { status: 404 });
    }

    await ensureSheetHeaders(sheets);
    await appendSheetData(sheets, parsedData);

    return new Response("Data successfully saved to Google Sheets", {
      status: 200,
    });
  } catch (error) {
    console.error("Error saving to Sheets:", error);
    return new Response("Error saving to Sheets", { status: 500 });
  }
}
