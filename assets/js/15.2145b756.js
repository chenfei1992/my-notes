(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{363:function(e,v,T){"use strict";T.r(v);var _=T(42),t=Object(_.a)({},(function(){var e=this,v=e.$createElement,T=e._self._c||v;return T("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[T("h2",{attrs:{id:"认识http"}},[e._v("认识HTTP")]),e._v(" "),T("p",[e._v("首先你听的最多的应该就是HTTP是一种"),T("code",[e._v("超文本传输协议(Hypertext Transfer Protocol)")]),e._v("。\n超文本传输协议可以进行文字分割：超文本（Hypertext）、传输（Transfer）、协议（Protocol）。\n按照范围的大小 协议 > 传输 > 超文本。")]),e._v(" "),T("h2",{attrs:{id:"什么是超文本"}},[e._v("什么是超文本")]),e._v(" "),T("p",[e._v("我们保存的信息通常都以"),T("code",[e._v("文本")]),e._v("即简单字符的形式存在，文本是一种能够被计算机解析的有意义的二进制数据包。而随着互联网的高速发展，两台电脑之间能够进行数据的传输后，\n人们不满足只能在两台电脑之间传输文字，还想要传输图片、音频、视频，甚至点击文字或图片能够进行"),T("code",[e._v("超链接")]),e._v("的跳转，那么文本的语义就被扩大了，这种语义扩大后的文本\n就被称为"),T("code",[e._v("超文本(Hypertext)")]),e._v("。")]),e._v(" "),T("h2",{attrs:{id:"什么是传输"}},[e._v("什么是传输")]),e._v(" "),T("p",[e._v("两台计算机之间会形成互联网关系进行通信，我们存储的超文本会被解析成为二进制数据包，由传输载体（例如同轴电缆，电话线，光缆）负责把二进制数据包由计算机终端传输到\n另一个终端的过程称为"),T("code",[e._v("传输(transfer)")]),e._v("\n通常我们把传输数据包的一方称为请求方，把接到二进制数据包的一方称为应答方。请求方和应答方可以进行互换，请求方也可以作为应答方接受数据，应答方也可以作为请求方请求数据")]),e._v(" "),T("h2",{attrs:{id:"什么是协议"}},[e._v("什么是协议")]),e._v(" "),T("p",[e._v("网络协议就是网络中(包括互联网)传递、管理信息的一些规范。计算机之间的相互通信需要共同遵守一定的规则，这些规则就称为网络协议。\nHTTP是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范")]),e._v(" "),T("h2",{attrs:{id:"网络模型"}},[e._v("网络模型")]),e._v(" "),T("p",[e._v("为了给网络协议的设计提供一个结构，网络设计者以"),T("code",[e._v("分层(layer)")]),e._v("的方式组织协议，每个协议属于层次模型之一。每一层都是向它的上一层\n提供"),T("code",[e._v("服务(service)")]),e._v("，即所谓的"),T("code",[e._v("服务模型(service model)")]),e._v("。每个分层中所有的协议称为"),T("code",[e._v("协议栈(protocol stack)")]),e._v("。因特网的协议栈由五个部分组成：物理层、\n链路层、网络层、运输层和应用层。我们采用自上而下的方法研究其原理，也就是应用层->物理层的方式。")]),e._v(" "),T("h2",{attrs:{id:"应用层"}},[e._v("应用层")]),e._v(" "),T("p",[e._v("应用层是网路应用程序和网络协议存放的分层，因特网的应用层包括许多协议，例如我们学web离不开http，电子邮件传送协议SMTP、端系统文件上传协议FTP、还有为我们进行\n域名解析的DNS协议。应用曾协议分布在多个端系统上，一个端系统应用程序与另外一个端系统应用程序的交换信息分组，我们把位于应用层的信息分组称为 "),T("code",[e._v("报文（message）")])]),e._v(" "),T("h2",{attrs:{id:"运输层"}},[e._v("运输层")]),e._v(" "),T("p",[e._v("因特网的运输层在应用程序断点之间传送应用程序报文，在这一层主要有两种传输协议TCP和UDP，利用这两者中的任何一个都能够传输报文，不过这两种协议有巨大的不同。\nTCP 向它的应用程序提供了面向连接的服务，它能够控制并确认报文是否到达，并提供了拥塞机制来控制网络传输，因此当网络用塞时，会抑制其传输速率。\nUDP 协议向它的应用程序提供了无连接服务。它不具备可靠性的特征，没有流量控制，也没有拥塞控制。我们把运输层的分组称为"),T("code",[e._v("报文段（segment）")])]),e._v(" "),T("h2",{attrs:{id:"网络层"}},[e._v("网络层")]),e._v(" "),T("p",[e._v("因特网的网络层负责将称为"),T("code",[e._v("数据报(datagram)")]),e._v("的网络分层从一台主机移动到另一台主机。网络层一个非常重要的协议是IP协议，所有具有网络层的因特网组件都必须运行IP协议，IP协议\n是一种网际协议，除了IP协议外，网络层还包括一些其他网际协议和路由选择协议，一般把网络层就称为IP层，由此可知IP协议的重要性。")]),e._v(" "),T("h2",{attrs:{id:"链路层"}},[e._v("链路层")]),e._v(" "),T("p",[e._v("现在我们有应用程序通信的协议，有了给应用程序提供运输的协议，还有了用于约定发送位置的IP协议，那么如何才能真正的发送数据？为了将分组从一个节点（主机或路由器）运输\n到另一个节点，网路层必须依靠链路层提供服务。链路层的例子包括以太网、Wifi和电缆接入的"),T("code",[e._v("DOCSIS")]),e._v("协议，因为数据从源目的地传送通常需要经过几条链路，一个数据包可能被\n沿途不同的链路层协议处理，我们把链路层的分组称为 "),T("code",[e._v("帧（frame）")])]),e._v(" "),T("h2",{attrs:{id:"物理层"}},[e._v("物理层")]),e._v(" "),T("p",[e._v("虽然链路层的作用是将帧从一个端系统运输到另一个端系统，而物理层的作用是将帧中的一个个比特从一个节点运输到另一个节点，物理层的协议仍然使用链路层协议，这些协议与实际的物理\n传输介质有关，例如，以太网有很多物理层协议：关于双绞铜线、关于同轴电缆、关于光纤等。\n应用层>运输层>网络层>链路层>物理层")]),e._v(" "),T("h2",{attrs:{id:"osi-模型"}},[e._v("OSI 模型")]),e._v(" "),T("p",[e._v("计算网络协议模型不是唯一的协议栈，ISO（国际标准化组织）提出来计算机网络应该按照7层来组织，那么7层网络协议栈与5层的区别在哪里？\nOSI要比上面的网络模型多了表示层和会话层，其他层基本一致。表示层主要包括数据压缩和数据加密以及数据描述，数据描述使得应用程序不必担心计算机内部存储格式的问题，而\n会话层提供了数据交换的定界和同步功能，包括建立检查点和恢复方案。\n应用层>表示层>会话层>运输层>网络层>链路层>物理层")]),e._v(" "),T("h2",{attrs:{id:"浏览器"}},[e._v("浏览器")]),e._v(" "),T("p",[e._v("浏览器正式的名字叫做 Web Broser，顾名思义，就是检索、查看互联网上网页资源的应用程序，名字里的 Web，实际上指的就是 World Wide Web，也就是万维网。\n我们在地址栏输入URL（即网址），浏览器会向DNS（域名服务器）提供网址，由它来完成URL到IP地址的映射。然后将请求你的请求提交给具体的服务器，在由服务器返回我们要的结果\n（以HTML编码格式返回给浏览器），浏览器执行HTML编码，将结果显示在浏览器的正文。这就是一个浏览器发起请求和接受相应的过程。")]),e._v(" "),T("h2",{attrs:{id:"web服务器"}},[e._v("Web服务器")]),e._v(" "),T("p",[e._v("Web服务器的正式名称叫做Web Server，web服务器一般指的是网站服务器，上面说到浏览器是HTTP请求的发起方，那么web服务器就是HTTP请求的应答方，web服务器可以向浏览器等web\n客户端提供文档，也可以放置网站文件，让全世界浏览；可以放置数据文件，让全世界下载。目前最主流的三个web服务器是Apache、Nginx、IIS")]),e._v(" "),T("h2",{attrs:{id:"cdn"}},[e._v("CDN")]),e._v(" "),T("p",[e._v("CDN的全称是Content Delivery Network，即内容分发网络，它应用了 HTTP 协议里的缓存和代理技术，代替源站响应客户端的请求。CDN 是构建在现有网络基础之上的网络，\n它依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。\nCDN的关键技术主要有内容存储和分发技术。")]),e._v(" "),T("h2",{attrs:{id:"waf"}},[e._v("WAF")]),e._v(" "),T("p",[e._v("WAF 是一种 Web 应用程序防护系统（Web Application Firewall，简称 WAF），它是一种通过执行一系列针对HTTP / HTTPS的安全策略来专门为Web应用提供保护的一款产品，\n它是应用层面的防火墙，专门检测 HTTP 流量，是防护 Web 应用的安全技术。\nWAF 通常位于 Web 服务器之前，可以阻止如 SQL 注入、跨站脚本等攻击，目前应用较多的一个开源项目是 ModSecurity，它能够完全集成进 Apache 或 Nginx。")]),e._v(" "),T("h2",{attrs:{id:"webservice"}},[e._v("WebService")]),e._v(" "),T("p",[e._v("WebService 是一种 Web 应用程序，WebService是一种跨编程语言和跨操作系统平台的远程调用技术。\nWeb Service 是一种由 W3C 定义的应用服务开发规范，使用 client-server 主从架构，通常使用 WSDL 定义服务接口，使用 HTTP 协议传输 XML 或 SOAP 消息，\n它是一个基于 Web（HTTP）的服务架构技术，既可以运行在内网，也可以在适当保护后运行在外网。")]),e._v(" "),T("h2",{attrs:{id:"tcp-ip"}},[e._v("TCP/IP")]),e._v(" "),T("p",[e._v("TCP/IP 协议你一定听过，TCP/IP 我们一般称之为协议簇，什么意思呢？就是 TCP/IP 协议簇中不仅仅只有 TCP 协议和 IP 协议，它是一系列网络通信协议的统称。\n而其中最核心的两个协议就是 TCP / IP 协议，其他的还有 UDP、ICMP、ARP 等等，共同构成了一个复杂但有层次的协议栈。\nTCP 协议的全称是 Transmission Control Protocol 的缩写，意思是传输控制协议，HTTP 使用 TCP 作为通信协议，这是因为 TCP 是一种可靠的协议，而可靠能保证数据不丢失。\nIP 协议的全称是 Internet Protocol 的缩写，它主要解决的是通信双方寻址的问题。IP 协议使用 IP 地址 来标识互联网上的每一台计算机，可以把 IP 地址想象成为你手机的电话号码，\n你要与他人通话必须先要知道他人的手机号码，计算机网络中信息交换必须先要知道对方的 IP 地址。（关于 TCP 和 IP 更多的讨论我们会在后面详解）")]),e._v(" "),T("h2",{attrs:{id:"uri-url"}},[e._v("URI/URL")]),e._v(" "),T("p",[e._v("URI的全称是（Uniform Resource Identifier），中文名称是统一资源标识符，使用它就能够唯一地标记互联网上资源。\nURL的全称是（Uniform Resource Locator），中文名称是统一资源定位符，也就是我们俗称的网址，它实际上是 URI 的一个子集")]),e._v(" "),T("h2",{attrs:{id:"https"}},[e._v("HTTPS")]),e._v(" "),T("p",[e._v("HTTP 一般是明文传输，很容易被攻击者窃取重要信息，鉴于此，HTTPS 应运而生。HTTPS 的全称为 （Hyper Text Transfer Protocol over SecureSocket Layer），全称有点长，HTTPS 和 HTTP 有很大的不同在于 HTTPS 是以安全为目标的 HTTP 通道，在 HTTP 的基础上通过传输加密和身份认证保证了传输过程的安全性。HTTPS 在 HTTP 的基础上增加了 SSL 层，也就是说 HTTPS = HTTP + SSL。")]),e._v(" "),T("h2",{attrs:{id:"http-请求响应过程"}},[e._v("HTTP 请求响应过程")]),e._v(" "),T("p",[e._v("你是不是很好奇，当你在浏览器中输入网址后，到底发生了什么事情？你想要的内容是如何展现出来的？让我们通过一个例子来探讨一下，我们假设访问的 URL 地址为 http://www.someSchool.edu/someDepartment/home.index，当我们输入网址并点击回车时，浏览器内部会进行如下操作")]),e._v(" "),T("ul",[T("li",[e._v("DNS服务器会首先进行域名的映射，找到访问www.someSchool.edu所在的地址，然后HTTP 客户端进程在 80 端口发起一个到服务器 www.someSchool.edu 的 TCP 连接（80 端口是 HTTP 的默认端口）。在客户和服务器进程中都会有一个套接字与其相连。")]),e._v(" "),T("li",[e._v("HTTP 客户端通过它的套接字向服务器发送一个 HTTP 请求报文。该报文中包含了路径 someDepartment/home.index 的资源，我们后面会详细讨论 HTTP 请求报文。")]),e._v(" "),T("li",[e._v("HTTP 服务器通过它的套接字接受该报文，进行请求的解析工作，并从其存储器(RAM 或磁盘)中检索出对象 www.someSchool.edu/someDepartment/home.index，然后把检索出来的对象进行封装，封装到 HTTP 响应报文中，并通过套接字向客户进行发送。")]),e._v(" "),T("li",[e._v("HTTP 服务器随即通知 TCP 断开 TCP 连接，实际上是需要等到客户接受完响应报文后才会断开 TCP 连接。")]),e._v(" "),T("li",[e._v("HTTP 客户端接受完响应报文后，TCP 连接会关闭。HTTP 客户端从响应中提取出报文中是一个 HTML 响应文件，并检查该 HTML 文件，然后循环检查报文中其他内部对象。\n检查完成后，HTTP 客户端会把对应的资源通过显示器呈现给用户。")])]),e._v(" "),T("h2",{attrs:{id:"http请求特征"}},[e._v("HTTP请求特征")]),e._v(" "),T("p",[e._v("从上面整个过程中我们可以总结出 HTTP 进行分组传输是具有以下特征")]),e._v(" "),T("ul",[T("li",[e._v("支持客户-服务器模式")]),e._v(" "),T("li",[e._v("简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有 GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于 HTTP 协议简单，\n使得 HTTP 服务器的程序规模小，因而通信速度很快。")]),e._v(" "),T("li",[e._v("灵活：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标记。")]),e._v(" "),T("li",[e._v("无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。")]),e._v(" "),T("li",[e._v("无状态：HTTP 协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。\n另一方面，在服务器不需要先前信息时它的应答就较快。")])]),e._v(" "),T("h2",{attrs:{id:"详解http报文"}},[e._v("详解HTTP报文")]),e._v(" "),T("p",[e._v("我们上面描述了一下 HTTP 的请求响应过程，流程比较简单，但是凡事就怕认真，你这一认真，就能拓展出很多东西，比如 HTTP 报文是什么样的，它的组成格式是什么？ 下面就来探讨一下\nHTTP 协议主要由三大部分组成：")]),e._v(" "),T("ul",[T("li",[e._v("起始行（start line）：描述请求或响应的基本信息；")]),e._v(" "),T("li",[e._v("头部字段（header）：使用 key-value 形式更详细地说明报文；")]),e._v(" "),T("li",[e._v("消息正文（entity）：实际传输的数据，它不一定是纯文本，可以是图片、视频等二进制数据。\n其中起始行和头部字段并成为 请求头 或者 响应头，统称为 Header；消息正文也叫做实体，称为 body。HTTP 协议规定每次发送的报文必须要有 Header，但是可以没有 body，也就是说头信息是必须的，实体信息可以没有。而且在 header 和 body 之间必须要有一个空行（CRLF）")])]),e._v(" "),T("h2",{attrs:{id:"http请求方法"}},[e._v("HTTP请求方法")]),e._v(" "),T("p",[e._v("HTTP 请求方法一般分为 8 种，它们分别是")]),e._v(" "),T("ul",[T("li",[e._v("GET 获取资源，GET 方法用来请求访问已被 URI 识别的资源。指定的资源经服务器端解析后返回响应内容。也就是说，如果请求的资源是文本，那就保持原样返回；")]),e._v(" "),T("li",[e._v("POST 传输实体，虽然 GET 方法也可以传输主体信息，但是便于区分，我们一般不用 GET 传输实体信息，反而使用 POST 传输实体信息，")]),e._v(" "),T("li",[e._v("PUT 传输文件，PUT 方法用来传输文件。就像 FTP 协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存到请求 URI 指定的位置。\n但是，鉴于 HTTP 的 PUT 方法自身不带验证机制，任何人都可以上传文件 , 存在安全性问题，因此一般的 W eb 网站不使用该方法。若配合 W eb 应用程序的验证机制，或架构设计采用REST（REpresentational State Transfer，表征状态转移）标准的同类 Web 网站，就可能会开放使用 PUT 方法。")]),e._v(" "),T("li",[e._v("HEAD 获得响应首部，HEAD 方法和 GET 方法一样，只是不返回报文主体部分。用于确认 URI 的有效性及资源更新的日期时间等。")]),e._v(" "),T("li",[e._v("DELETE 删除文件，DELETE 方法用来删除文件，是与 PUT 相反的方法。DELETE 方法按请求 URI 删除指定的资源。")]),e._v(" "),T("li",[e._v("OPTIONS 询问支持的方法，OPTIONS 方法用来查询针对请求 URI 指定的资源支持的方法。")]),e._v(" "),T("li",[e._v("TRACE 追踪路径，TRACE 方法是让 Web 服务器端将之前的请求通信环回给客户端的方法。")]),e._v(" "),T("li",[e._v("CONNECT 要求用隧道协议连接代理，CONNECT 方法要求在与代理服务器通信时建立隧道，实现用隧道协议进行 TCP 通信。主要使用 SSL（Secure Sockets Layer，安全套接层）和 TLS（Transport Layer Security，传输层安全）协议把通信内容加 密后经网络隧道传输。")])]),e._v(" "),T("h2",{attrs:{id:"http请求url"}},[e._v("HTTP请求URL")]),e._v(" "),T("p",[e._v("HTTP 协议使用 URI 定位互联网上的资源。正是因为 URI 的特定功能，在互联网上任意位置的资源都能访问到。URL 带有请求对象的标识符。在上面的例子中，\n浏览器正在请求对象 /somedir/page.html 的资源。")]),e._v(" "),T("p",[e._v("我们再通过一个完整的域名解析一下 URL\n比如 http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument 这个 URL 比较繁琐了吧，你把这个 URL 搞懂了\n其他的 URL 也就不成问题了。")]),e._v(" "),T("p",[e._v("http://告诉浏览器使用何种协议。对于大部分 Web 资源，通常使用 HTTP 协议或其安全版本，HTTPS 协议。另外，浏览器也知道如何处理其他协议。例如， mailto: 协议指示\n浏览器打开邮件客户端；ftp:协议指示浏览器处理文件传输。")]),e._v(" "),T("p",[e._v("www.example.com 既是一个域名，也代表管理该域名的机构。它指示了需要向网络上的哪一台主机发起请求。当然，也可以直接向主机的 IP address 地址发起请求。但直接使用\nIP 地址的场景并不常见。")]),e._v(" "),T("p",[e._v("我们前面说到，两个主机之间要发起 TCP 连接需要两个条件，主机 + 端口。它表示用于访问 Web 服务器上资源的入口。如果访问的该 Web 服务器使用HTTP协议的标准端口\n（HTTP为80，HTTPS为443）授予对其资源的访问权限，则通常省略此部分。否则端口就是 URI 必须的部分。")]),e._v(" "),T("p",[e._v("/path/to/myfile.html 是 Web 服务器上资源的路径。以端口后面的第一个 / 开始，到 ? 号之前结束，中间的 每一个/ 都代表了层级（上下级）关系。这个 URL 的请求资源\n是一个 html 页面。")]),e._v(" "),T("p",[e._v("?key1=value1&key2=value2 是提供给 Web 服务器的额外参数。如果是 GET 请求，一般带有请求 URL 参数，如果是 POST 请求，则不会在路径后面直接加参数。这些参数是用\n& 符号分隔的键/值对列表。key1 = value1 是第一对，key2 = value2 是第二对参数")]),e._v(" "),T("p",[e._v("#SomewhereInTheDocument 是资源本身的某一部分的一个锚点。锚点代表资源内的一种“书签”，它给予浏览器显示位于该“加书签”点的内容的指示。例如，在HTML文档上，浏览器将滚动到定义锚点的那个点上；在视频或音频文档上，浏览器将转到锚点代表的那个时间。值得注意的是 # 号后面的部分，也称为片段标识符，永远不会与请求一起发送到服务器。\n"),T("a",{attrs:{href:"https://mp.weixin.qq.com/s/ZlqotT7upeqC-JOwYVqM5g",target:"_blank",rel:"noopener noreferrer"}},[e._v("原地址"),T("OutboundLink")],1)])])}),[],!1,null,null,null);v.default=t.exports}}]);