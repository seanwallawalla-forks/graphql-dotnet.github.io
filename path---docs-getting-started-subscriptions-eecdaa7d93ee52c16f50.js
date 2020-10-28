webpackJsonp([0xfd69145331c0],{328:function(s,n){s.exports={data:{markdownRemark:{html:'<h1 id="subscriptions"><a href="#subscriptions" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Subscriptions</h1>\n<p>Subscriptions are supported through the use of <code class="language-text">IObservable&lt;T&gt;</code>.  You will need a server that supports a Subscription protocol.  The <a href="https://github.com/graphql-dotnet/server/">GraphQL Server</a> project provides a .NET Core server that implements the Apollo GraphQL subscription protocol.  See the <a href="https://github.com/graphql-dotnet/server/tree/develop/samples">GraphQL Server project samples</a>.</p>\n<p>Instead of using the <code class="language-text">query</code> or <code class="language-text">mutation</code> keyword you are required to use <code class="language-text">subscription</code>.  Similar to a <code class="language-text">query</code> and <code class="language-text">mutation</code>, you can omit the <code class="language-text">Operation</code> name if there is only a single operation in the request.</p>\n<div class="gatsby-highlight" data-language="graphql">\n      <pre class="language-graphql"><code class="language-graphql"><span class="token keyword">subscription</span> MessageAdded <span class="token punctuation">{</span>\n  messageAdded <span class="token punctuation">{</span>\n    from <span class="token punctuation">{</span>\n      id\n      displayName\n    <span class="token punctuation">}</span>\n    content\n    sentAt\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<div class="gatsby-highlight" data-language="csharp">\n      <pre class="language-csharp"><code class="language-csharp"><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChatSubscriptions</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">ObjectGraphType</span></span>\n<span class="token punctuation">{</span>\n  <span class="token keyword">private</span> <span class="token keyword">readonly</span> <span class="token class-name">IChat</span> _chat<span class="token punctuation">;</span>\n\n  <span class="token keyword">public</span> <span class="token function">ChatSubscriptions</span><span class="token punctuation">(</span><span class="token class-name">IChat</span> chat<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    _chat <span class="token operator">=</span> chat<span class="token punctuation">;</span>\n\n    <span class="token function">AddField</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventStreamFieldType</span>\n    <span class="token punctuation">{</span>\n      Name <span class="token operator">=</span> <span class="token string">"messageAdded"</span><span class="token punctuation">,</span>\n      Type <span class="token operator">=</span> <span class="token keyword">typeof</span><span class="token punctuation">(</span><span class="token type-expression class-name">MessageType</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n      Resolver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">FuncFieldResolver<span class="token punctuation">&lt;</span>Message<span class="token punctuation">></span></span><span class="token punctuation">(</span>ResolveMessage<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      Subscriber <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">EventStreamResolver<span class="token punctuation">&lt;</span>Message<span class="token punctuation">></span></span><span class="token punctuation">(</span>Subscribe<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">private</span> <span class="token return-type class-name">Message</span> <span class="token function">ResolveMessage</span><span class="token punctuation">(</span><span class="token class-name">IResolveFieldContext</span> context<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> context<span class="token punctuation">.</span>Source <span class="token keyword">as</span> <span class="token class-name">Message</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">private</span> <span class="token return-type class-name">IObservable<span class="token punctuation">&lt;</span>Message<span class="token punctuation">></span></span> <span class="token function">Subscribe</span><span class="token punctuation">(</span><span class="token class-name">IResolveEventStreamContext</span> context<span class="token punctuation">)</span>\n  <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> _chat<span class="token punctuation">.</span><span class="token function">Messages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<blockquote>\n<p>See this full schema <a href="https://github.com/graphql-dotnet/graphql-dotnet/blob/master/src/GraphQL.Tests/Subscription/SubscriptionSchema.cs">here</a>.</p>\n</blockquote>',fields:{relativePath:"docs/getting-started/subscriptions.md"}},site:{siteMetadata:{githubEditUrl:"https://github.com/graphql-dotnet/graphql-dotnet/edit/master/docs2/site"}}},pathContext:{relativePath:"docs/getting-started/subscriptions.md"}}}});
//# sourceMappingURL=path---docs-getting-started-subscriptions-eecdaa7d93ee52c16f50.js.map