// remark 相关
import * as remark from 'remark';
import * as slug from 'remark-slug';
import * as extractToc from 'remark-extract-toc';

export default (content) => {
  const processor = remark().use(slug).use(extractToc, {
    keys: ["data"]
  });
  const node = processor.parse(content);
  const tree = processor.runSync(node);
  return tree
}