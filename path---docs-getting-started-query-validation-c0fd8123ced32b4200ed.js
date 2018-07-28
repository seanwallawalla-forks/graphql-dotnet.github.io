webpackJsonp([0x6177e9bb8ac6],{305:function(a,n){a.exports={data:{markdownRemark:{html:'<h1 id="query-validation"><a href="#query-validation" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Query Validation</h1>\n<p>There <a href="http://facebook.github.io/graphql/June2018/#sec-Validation">are a number of query validation rules</a> that are ran when a query is executed.  All of these are turned on by default.  You can add your own validation rules or clear out the existing ones by accessing the <code class="language-text">ValidationRules</code> property.</p>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp">schema<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span>_ <span class="token operator">=</span><span class="token operator">></span>\n<span class="token punctuation">{</span>\n  _<span class="token punctuation">.</span>Query <span class="token operator">=</span> <span class="token string">"..."</span><span class="token punctuation">;</span>\n  _<span class="token punctuation">.</span>ValidationRules <span class="token operator">=</span> <span class="token keyword">new</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">RequiresAuthValidationRule</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token function">Concat</span><span class="token punctuation">(</span>DocumentValidator<span class="token punctuation">.</span><span class="token function">CoreRules</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></code></pre>\n      </div>'}},pathContext:{relativePath:"docs/getting-started/query-validation.md"}}}});
//# sourceMappingURL=path---docs-getting-started-query-validation-c0fd8123ced32b4200ed.js.map