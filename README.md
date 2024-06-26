# DigDog
这个项目😨
(╯°Д°）╯︵ /(.□ . \)

# 项目概要

## 基本功能 

### 欢迎界面
* 网页功能简介：简单介绍网页的主要功能。
* 主要小组件的简介：让用户可以一目了然的看到我们主要的小组件。
* 快速访问DOCK栏：提供快速访问用户最常用的功能和网站。大概就是一个集成了常用网址的导航栏，让用户可以快速定位常访问的网站。
* 小组件的使用方法：相当于说明书，可以先在欢迎界面搞一个提示，让客户按进去以后再细分客户需要找的小组件使用方法。
### （多）用户的欢迎和登陆界面
* 用户注册：用户可以填写用户名和密码进行账户注册。
* 用户登录：已注册的用户可以使用用户名和密码进行登录。
* 注销功能：用户可以选择注销当前登录的账户。
* 欢迎界面：登录成功后，用户可以在欢迎界面查看个人信息。
  
*（这个项目可以根据具体的需求进行扩展和定制，例如添加密码重置功能、用户权限管理等。前端界面可以使用HTML、CSS和JavaScript来实现，后端可以使用任何适合的编程语言和框架进行开发。）*

### 自定义的个人主页
* 个性化设计：用户可以自由选择和定制网页的配色方案、字体样式和布局结构，以反映个人或品牌风格。
* 数据统计：集成访问统计工具，帮助用户了解访问者行为，优化网站内容。
* 导航定制：自定义主页的导航菜单，包括链接到个人资料、联系方式、项目展示等页面。
* 安全保护：提供基本的安全设置，如密码保护、SSL加密等，保护用户数据和隐私。

### 保存收藏的网页链接标签，作为快捷标签
* 便捷性：用户可以将任意的网站收藏并保存，以方便快速访问
* 美观性：用户可根据自己的需求对标签进行分类和整理，使其更加美观且简洁
*  高效性：用户可以更加快速的访问自己所需要的网站，以达到更高的效率

## 多功能（可视化）

### 小组件
#### 基础组件
##### 日历
* 默认日历：可以读取用户所在地区1并显示对应日历
* 自定义日历：用户也可自定义当天所在时期（仅支持一个自定义日历）
##### 时钟
* 默认时钟：可以读取用户所在地区1并显示对应时间
* 固定时钟：用户可选择几个不同地区的时钟作为固定时钟放在个人主页
##### 倒数计时
* 自定义时间进行倒数计时（最多自定义5个时长）
* 停止某个倒计后，可以继续，也可以“反悔停止”继续
* 选择结束提醒：弹窗、音效、音乐
##### 闹钟
* 定时（精确到分钟）（最多自定义10个）
* 选择结束提醒：弹窗、音效、音乐
##### 日程提醒
* 一年内（365天）可在任意一天添加当天任务，可以给任务分等级（1-3）（还保存已过一年的数据）
* 小组件会以日历形式呈现，并提示最近一周的任务，其中当天、明天、一周、三周内会以不同背景颜色区别开，优先级高的会以文字颜色区分开
* 任务进入一周内、明天有任务、当天有任务，都会在每次进入网页时以弹窗形式提醒（功能可开/关）
##### To do list
* 传统意义上的备忘录
* 支持天“备忘”、周末“备忘”、假期“备忘”功能
* 进入界面；创建各条任务；给任务分类（如语文、数学……），也可不分类； 定义当前备忘录属于哪里类型、哪年哪月哪日（默认今日方便改或不改）；生效后可勾选是否完成哪一项任务，或特殊标记（可自定义最多3个，比如“脑残作业”、“明天抄写”、“狗都不做”），也可再次进入修改（删除、添加任务）
##### 壁纸选择
* 可以选择网站提供的壁纸
* 网站记录各个壁纸使用人数、人次、时长数据，方便我为用户上传他们更喜欢的壁纸
##### 超链接小组件
* 网站自己提供一些常用链接
* 用户可自定义（最多10个）

#### 升级组件
##### 作业不帮
* 连接KIMI的API，但不用KIMI的界面，用户上传图片，我们让KIMI提取文字、给出答案和解析、转换排版，然后返回给用户
##### 自定义组件接口
* 提供新编程组件位置，用户可以将自己编写的小组件上传的位置，经过我们审核，可以投入使用，用户可以选择共享其他人、自己用、共享给所有人

#### 游戏组件
* RZ小游戏（N子棋等）
* 基础游戏
##### *备注*
* *1.HTML5 Geolocation API获取地理位置或Intl.DateTimeFormat().resolvedOptions().timeZone获取时区*
* *2.需要用cookies* 

### 主流网页热搜榜
* 热搜信息获取：通过API或爬虫技术，获取主流网页的热搜信息，包括热门关键词、热门话题或新闻等。
* 搜索功能：提供关键词搜索功能，使用户可以根据自己的兴趣和需求快速找到相关的热门内容。                                                           	
* 数据存储：可选择将热搜数据存储到数据库中，以便进行历史数据分析或其他数据处理操作。                                                                  	
* 排行榜：提供一个独立的模块，展示当前的热搜排行榜。按照热度或相关指标对热搜内容进行排序，让用户可以一目了然地看到当前的热门话题和热搜排名。

## 项目周期

### 前期（10-12W）目标：

#### 基于HTML、CSS、JavaScript完成除数据库以外的基本功能搭建。
* 欢迎界面内容（美工）：“欢迎/Welcome”
* 网页与小组件功能说明书编写（美工）：做成链接网页嵌入欢迎界面。
* 欢迎界面Dock栏（程序+美工）：设置常用超链接小图标，并设置搜索栏链接百度。
* 登录界面（程序+美工）：前期先搭建模拟后端数据验证的登录。
* 注册界面（程序+美工）：模拟后端数据验证的注册。
* 个人主页（程序+初级美工）

#### 简单小组件的基本功能设计与搭建。
* 天气（程序+美工）
* 倒计时（程序+美工）
* 时钟、闹钟（程序+美工）
* 四子棋（程序）

## 小组分工

### UI美工
* 基于CSS对HTML元素的美化（CSS程序高级完善）
* 背景设置、圆角处理等视觉加工
#### 前期	
* 美工1（张海鑫）负责“1.1、1.4、1.5”
* 美工2（熊文浩）负责“1.2、2.2、2.3”

### 程序设计
* HTML程序编写 & 最最基本的CSS程序编写 & JavaScript程序编写
* 中后期利用Ajax & IndexedDB进行后端数据库开发
* 网页主体，输入输出交互接口设计，基本视觉设计；复杂功能的实现。
#### 前期
* 程序员1（周奇俊）负责“1.4、1.5、1.6”
* 程序员2（王榆铤）负责“2.2、2.3”

### 灵活岗位：
* 完成Index，随时听从调配并协助需要帮助的同学，兼职美工和程序员
#### 前期
* 灵活1（黄东城）负责“1.3……”
* 灵活2（李欣阳）负责“1.6……”
* 灵活3（张一鸣）负责“2.1、2.4……”
