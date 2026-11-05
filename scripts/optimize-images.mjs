import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { readFile, mkdir, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('assets/generated-manifest.json',root),'utf8'));
await mkdir(new URL('assets/photos/',root),{recursive:true});
const sizes = {};
for (const image of manifest) {
  const source = fileURLToPath(new URL(image.source,root));
  const meta = await sharp(source).metadata();
  sizes[image.id] = { width:meta.width, height:meta.height };
  const widths = image.id === 'hero' ? [960,1440,2400] : [480,960,1440];
  for (const width of widths) {
    await sharp(source).resize({width,withoutEnlargement:true}).webp({quality:88,effort:5})
      .withMetadata({exif:{IFD0:{ImageDescription:image.prompt,Artist:'OpenAI image_gen; Olivo concept'}}})
      .toFile(fileURLToPath(new URL(`assets/photos/${image.id}-${width}.webp`,root)));
  }
  if (image.id === 'hero') {
    // Art-directed crop, not an enlarged thumbnail. Preserve the woman's portrait and the arches.
    const crop = {left:Math.round(meta.width*.1),top:0,width:Math.round(meta.width*.63),height:meta.height};
    for(const width of [640,960]) {
      await sharp(source).extract(crop).resize({width,withoutEnlargement:true}).webp({quality:89,effort:5})
        .withMetadata({exif:{IFD0:{ImageDescription:`${image.prompt} Delivery: mobile art-directed crop from native source.`}}})
        .toFile(fileURLToPath(new URL(`assets/photos/hero-mobile-${width}.webp`,root)));
    }
  }
}
await writeFile(new URL('assets/image-dimensions.json',root),JSON.stringify(sizes,null,2)+'\n');
// Keep exact prompts in portable sidecars as well as EXIF, for formats without native tool support.
const provenanceTool = fileURLToPath(new URL('../.agents/skills/impeccable/scripts/impeccable',root));
try {
  for (const image of manifest) {
    const widths = image.id === 'hero' ? [960,1440,2400] : [480,960,1440];
    const paths = [image.source,...widths.map(width=>`assets/photos/${image.id}-${width}.webp`)];
    if(image.id==='hero') paths.push('assets/photos/hero-mobile-640.webp','assets/photos/hero-mobile-960.webp');
    for(const path of paths) execFileSync(provenanceTool,['embed-prompt',fileURLToPath(new URL(path,root)),'--prompt',image.prompt],{stdio:'pipe'});
  }
} catch(error) {
  if(error.code!=='ENOENT') throw error;
  // Source manifest and EXIF remain sufficient to reproduce assets outside this workspace.
}
console.log(`Optimized ${manifest.length} native source images. No upscaling.`);
