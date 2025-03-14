import { z } from "zod";

export type DidacticMaterial = z.infer<typeof DidacticMaterialModel>;

const DidacticMaterialModel = z.object({
  file: z.string(),
});

export default DidacticMaterialModel;
