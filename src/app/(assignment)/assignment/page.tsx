import Scene2D from "@/components/scene-2d";
import { Button } from "@/components/ui/button";

export default function AssignmentPage() {
  return (
    <>
      <Scene2D />

      <div className="absolute bottom-4 bg-gray-200 p-4 rounded-md -translate-x-1/2 left-1/2 w-1/3">
        <div className="text-center">
          <p className="text-xl">
            Mova o ponto A para a posição {"("}3, 2{")"}.
          </p>

          <div className="flex items-center justify-center gap-4 mt-4">
            <Button>Confirmar</Button>
          </div>
        </div>
      </div>
    </>
  );
}
