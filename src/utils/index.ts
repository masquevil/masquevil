export function getDocs() {
  // 动态导入所有 docs 目录下的 .md 文件
  const docs = import.meta.glob<false, 'raw', string>('@/docs/*.md', {
    query: '?raw',
    import: 'default',
    eager: false,
  });

  // 从文件路径中提取模块名称
  return Object.entries(docs).map(([filePath, fileContent]) => {
    // 从路径中提取模块名，例如: ./docs/前端工程师.md -> 前端工程师
    const docName = filePath.split('/').slice(-1)[0].slice(0, -3);
    return {
      name: docName,
      content: fileContent,
    };
  });
}

export async function getDocByName(name: string) {
  const docs = getDocs();
  return (await docs.find((doc) => doc.name === name)?.content()) || null;
}
