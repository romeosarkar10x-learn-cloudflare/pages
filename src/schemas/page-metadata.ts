import z from "zod";

export const PageMetadataSchema = z.object({
    slug: z.string(),
    label: z.string(),
    title: z.string(),
    description: z.string(),
    accent: z.string(),
    views: z.number(),
    ms: z.number(),
});

export type PageMetadata = z.infer<typeof PageMetadataSchema>;
