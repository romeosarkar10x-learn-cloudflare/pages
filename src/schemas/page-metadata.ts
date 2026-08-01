import z from "zod";

export const PageMetadataSchema = z.object({
    slug: z.string(),
    label: z.string(),
    title: z.string(),
    description: z.string(),
    accent: z.string(),
});

export type PageMetadata = z.infer<typeof PageMetadataSchema>;
