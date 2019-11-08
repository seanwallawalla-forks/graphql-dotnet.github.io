webpackJsonp([56185524266781],{312:function(a,n){a.exports={data:{markdownRemark:{html:'<h1 id="lists-and-non-null"><a href="#lists-and-non-null" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Lists and Non-Null</h1>\n<p>Object types, scalars, and enums are the only kinds of types you can define in GraphQL. But when you use the types in other parts of the schema, or in your query variable declarations, you can apply additional <em>type modifiers</em> that affect validation of those values. Let\'s look at an example:</p>\n<div class="gatsby-highlight" data-language="graphql">\n      <pre class="language-graphql"><code class="language-graphql">type Character <span class="token punctuation">{</span>\n  <span class="token attr-name">name</span><span class="token punctuation">:</span> String<span class="token operator">!</span>\n  <span class="token attr-name">appearsIn</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>Episode<span class="token punctuation">]</span><span class="token operator">!</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Here, we\'re using a <code class="language-text">String</code> type and marking it as <em>Non-Null</em> by adding an exclamation mark, <code class="language-text">!</code> after the type name. This means that our server always expects to return a non-null value for this field, and if it ends up getting a null value that will actually trigger a GraphQL execution error, letting the client know that something has gone wrong.</p>\n<p>The Non-Null type modifier can also be used when defining arguments for a field, which will cause the GraphQL server to return a validation error if a null value is passed as that argument, whether in the GraphQL string or in the variables.</p>\n<div class="gatsby-highlight" data-language="graphql">\n      <pre class="language-graphql"><code class="language-graphql"><span class="token keyword">query</span> DroidById<span class="token punctuation">(</span><span class="token variable">$id</span><span class="token punctuation">:</span> ID<span class="token operator">!</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  droid<span class="token punctuation">(</span><span class="token attr-name">id</span><span class="token punctuation">:</span> <span class="token variable">$id</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    name\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<p>Lists work in a similar way: We can use a type modifier to mark a type as a <code class="language-text">List</code>, which indicates that this field will return an array of that type. In the schema language, this is denoted by wrapping the type in square brackets, <code class="language-text">[</code> and <code class="language-text">]</code>. It works the same for arguments, where the validation step will expect an array for that value.</p>\n<p>The Non-Null and List modifiers can be combined. For example, you can have a List of Non-Null Strings:</p>\n<div class="gatsby-highlight" data-language="graphql">\n      <pre class="language-graphql"><code class="language-graphql"><span class="token attr-name">myField</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>String<span class="token operator">!</span><span class="token punctuation">]</span></code></pre>\n      </div>\n<p>This means that the <em>list itself</em> can be null, but it can\'t have any null members. For example, in JSON:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js">myField<span class="token punctuation">:</span> <span class="token keyword">null</span> <span class="token comment">// valid</span>\nmyField<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// valid</span>\nmyField<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">]</span> <span class="token comment">// valid</span>\nmyField<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">]</span> <span class="token comment">// error</span></code></pre>\n      </div>\n<p>Now, let\'s say we defined a Non-Null List of Strings:</p>\n<div class="gatsby-highlight" data-language="graphql">\n      <pre class="language-graphql"><code class="language-graphql"><span class="token attr-name">myField</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>String<span class="token punctuation">]</span><span class="token operator">!</span></code></pre>\n      </div>\n<p>This means that the list itself cannot be null, but it can contain null values:</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js">myField<span class="token punctuation">:</span> <span class="token keyword">null</span> <span class="token comment">// error</span>\nmyField<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// valid</span>\nmyField<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">]</span> <span class="token comment">// valid</span>\nmyField<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">\'a\'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">\'b\'</span><span class="token punctuation">]</span> <span class="token comment">// valid</span></code></pre>\n      </div>\n<p>You can arbitrarily nest any number of Non-Null and List modifiers, according to your needs.</p>',fields:{relativePath:"docs/getting-started/lists-non-null.md"}},site:{siteMetadata:{githubEditUrl:"https://github.com/graphql-dotnet/graphql-dotnet/edit/master/docs2/site"}}},pathContext:{relativePath:"docs/getting-started/lists-non-null.md"}}}});
//# sourceMappingURL=path---docs-getting-started-lists-non-null-7b8727ecf5bca2c31e81.js.map