import esbuild from "esbuild";
import { copy } from "esbuild-plugin-copy";

esbuild.build({
    entryPoints: {
        index: "src/pages/index.tsx",
    },
    bundle: true,
    outdir: "dist",
    plugins: [
        copy({
            assets: {
                from: ["src/public/**/*"],
                to: ["."],
            },
        }),
    ],
});
