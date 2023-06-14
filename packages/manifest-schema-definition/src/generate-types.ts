import { readFile, writeFile } from 'fs/promises';
import { promise as glob } from 'glob-promise';
import { compile } from 'json-schema-to-typescript';
import path from 'path';

class TypesGenerator {
  private map = new Map<string, any>();

  private readonly ROOT_ID = 'root';

  async readAndSave(filePath: string) {
    const contentsRaw = await readFile(filePath, { encoding: 'utf8' });
    const contents = JSON.parse(contentsRaw);
    this.map.set(contents.$id, contents);
  }

  async main() {
    const fileReadPromises: Promise<void>[] = [];
    const matches = await glob(path.join(__dirname, 'manifest', '**', '*.json'));

    for (const match of matches) {
      fileReadPromises.push(this.readAndSave(match));
    }

    await Promise.all(fileReadPromises);

    const data = await compile(this.map.get(this.ROOT_ID), this.map.get(this.ROOT_ID).title, {
      $refOptions: {
        resolve: {
          file: false,
          http: false,
          other: {
            canRead: () => true,
            read: (file: { url: string }) => {
              const id = path.basename(file.url);
              return this.map.get(id);
            },
          },
        },
      },
    });

    await writeFile('src/schema-types.ts', data);
  }
}

new TypesGenerator().main().catch(console.error);
