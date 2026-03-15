import {} from 'marked';

// 扩展 Tokens 命名空间，添加自定义 token 类型
declare module 'marked' {
  namespace Tokens {
    interface CodeCustomGeneric {
      type: string;
      raw: string;
      text: string;
    }
  }
}
