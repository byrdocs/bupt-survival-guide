# 任务：更新柏油图谱（freshatlas）宿舍对比图

你正在 `byrdocs/bupt-survival-guide` 仓库的 GitHub Action 中运行。目标是把 freshatlas 项目里的「宿舍」对比表，**按校区拆成沙河、本部两张 PNG**，嵌入本仓库文档，并提交一个 Pull Request。运行环境已经准备好：Typst 0.15.0、所需字体、freshatlas 源码克隆（`./freshatlas`，已检出目标 commit）、`gh` CLI（已登录）、git 身份（byrdocs-bot）。

请严格按下面步骤完成，**不要询问、不要等待确认，自主完成全部工作**。

## 0. 先判断宿舍是否真的变化（你来判断，不是代码）

工作流只判断了 freshatlas 的最新 commit 与「上次已成功处理的 commit」不同，**并未**判断宿舍内容是否变化。请你自己判断：

- 本提示前面给出了「上次已成功处理的 commit」（diff 基准）和「目标 commit」（freshatlas 最新）。**基准可能为空字符串**，表示首次运行 / 缓存丢失、没有可比基准。
- 若基准非空：在 `./freshatlas` 内比较二者 diff：
  `git -C freshatlas diff <基准commit>..<目标commit> -- content/dormitory.typ content/model/ template/`
  综合判断这些改动**是否会影响宿舍对比图的呈现**（内容、配置、样式、模板等）。纯属无关的改动（其他章节、CI、README 等）不算。
- 若基准为空：无从比较，**一律按“有变化”处理**，重新生成图片（这样能确保首次运行就产出图片）。

判断结果：

- **宿舍无实质变化**：不要改任何文档、不要建分支、不要提 PR。**只需执行第 7 步**把缓存推进到目标 commit，然后结束并说明「宿舍无变化，已推进同步记录」。
- **宿舍有变化**：依次执行第 1~7 步。

> 关于失败：如果在第 1~6 步中遇到无法解决的问题（例如 Typst 始终编译失败、图片无法产出），**不要执行第 7 步、不要写出 `.last-polled-commit`**。这样工作流不会推进缓存，下次轮询会重试。请明确报告失败原因。

## 1. 理解 freshatlas 宿舍源码

- 入口文件：`freshatlas/content/dormitory.typ`，核心是名为 `主体表格` 的一张 `table`。
- 该表格把**沙河**与**本部**两个校区的宿舍楼在**纵向交错排列**：通过 `沙河-cell(...)` / `本部-cell(...)`（定义于 `freshatlas/content/model/campus-cell.typ`）标记每一段属于哪个校区。因此**无法靠裁剪图片分离校区**，必须改代码。
- 现有构建方式见 `freshatlas/Makefile`：
  `typst compile content/dormitory.typ <out>.png --root . --input release= --ppi 300`

## 2. 改 freshatlas 代码，拆成两张图（关键步骤）

在 `./freshatlas` 内**修改源码**，生成两份各自只含**一个校区**宿舍楼的表格，并分别编译为 PNG。推荐做法（自行判断更优雅的方案亦可）：

- 新建两个入口文件，例如 `freshatlas/content/dormitory-shahe.typ` 与 `freshatlas/content/dormitory-benbu.typ`，复用原有 `template` / `model`，各自渲染**仅该校区**的表格行（含表头、图例、表格注中与该校区相关的部分）。
- 注意保留原表的样式、图例（性别 / 好坏）、脚注与「好坏条」，使单校区图片仍然自洽可读；与某校区无关的脚注 / 特殊房间说明可剔除。
- 用 Typst 编译两张图（`--ppi 300`，`--root .`，`--input release=`）。若编译报错，阅读报错并修正源码，直到两张图都成功产出。

> 这些对 freshatlas 的改动**只用于在本次 Action 内产出图片**，`./freshatlas` 已被 `.gitignore` 忽略，**不要、也无法把它提交进本仓库**。

## 3. 放置图片

将两张 PNG 覆盖写入本仓库固定路径（覆盖同名文件，保证多次运行 diff 干净）：

- 沙河校区：`src/assets/freshatlas-沙河宿舍对比.png`
- 本部校区：`src/assets/freshatlas-本部宿舍对比.png`

## 4. 在锚点处激活图片（不要自己找位置放）

两篇文档里已经由维护者预置了**占位锚点**，连同图注、引用、合适的插入位置都写好了，被包在 HTML 注释中（图片未生成时保持注释，避免构建因缺图失败）。你的任务是把它“激活”，**不要另选位置插入图片**。

- 沙河图对应 `src/content/docs/沙河校区/住宿条件.md`，本部图对应 `src/content/docs/海淀校区/住宿条件.md`。
- 用 `grep -n "freshatlas-dorm-image" <文件>` 找到锚点。它形如：

  ```
  <!-- freshatlas-dorm-image:沙河 —— 占位块。……说明文字……

  各楼栋……可参考下图：

  ![沙河校区宿舍逐楼对比……](../../../assets/freshatlas-沙河宿舍对比.png)

  > 图片来源：……CC BY-NC-SA 4.0 提供。
  -->
  ```

- **激活方式**：删除开头的 `freshatlas-dorm-image:…` 说明那一行，并去掉这段注释的起止符，使其中的「引导句 + 图片 + 图注」变成正常可见的正文，**位置保持不变**。注释内的图注已写明来源与“已拆分”修改说明，通常无需改动；仅当宿舍维度/内容变化导致图注描述不准确时，才据实微调图注文字。
- 若该处**已经是激活状态**（之前的运行已取消注释，能直接搜到 `![...](../../../assets/freshatlas-沙河宿舍对比.png)` 而非注释），则**无需改文档**，本步只是确认；图片更新靠第 3 步覆盖 PNG 即可。
- 极重要：编辑任何 HTML 注释时，**注释正文内绝不可出现注释结束符**（会提前闭合注释、导致后面的 `![]()` 暴露成真引用而构建失败）。

## 5. 提交 PR

- 新建分支：`byrdocs-bot/sync-freshatlas-dorm-<短SHA>`（短 SHA 取目标 commit 前 7 位）。
- 只暂存并提交以下文件（首次激活时含两篇文档；后续仅覆盖 PNG 时文档可能无改动，按 `git status` 实际情况暂存）：
  - `src/assets/freshatlas-沙河宿舍对比.png`
  - `src/assets/freshatlas-本部宿舍对比.png`
  - `src/content/docs/沙河校区/住宿条件.md`（如有改动）
  - `src/content/docs/海淀校区/住宿条件.md`（如有改动）
- **切勿**提交 `freshatlas/` 目录（含其中的 `.last-polled-commit`）、任何 `BUPT-freshatlas-*.pdf`、或其他无关文件。提交前用 `git status` 核对。
- commit message（中文，遵循仓库习惯）示例：
  `docs: 同步柏油图谱宿舍对比图（沙河 / 本部分图）`
- 推送分支并用 `gh pr create` 开 PR，PR 正文说明：来源 commit、本次拆分为两图、协议 CC BY-NC-SA 4.0。

## 6. 自检

提交前确认：两张图都已成功产出并位于 `src/assets/`；对应锚点已激活（图片可正常引用）；运行 `pnpm build` 能通过（尤其确认没有任何被注释包裹的 `![]()` 因缺图而报错）；`git status` 中无多余文件。

## 7. 推进同步缓存（仅在成功 / 确认无变化时执行）

这是**最后一步**，只有在前面全部顺利（已成功提 PR，或确认宿舍无变化）时才做：把目标 commit 写入 `freshatlas/.last-polled-commit` 文件（完整 40 位 SHA，末尾一个换行）：

```
printf '%s\n' "<目标commit>" > freshatlas/.last-polled-commit
```

工作流会在 Claude 结束后把该文件存入 Actions 缓存，作为下次的 diff 基准与去重依据。**若你在前面任何环节失败、未能产出图片，就不要写这个文件**，以便下次轮询重试。它位于已被忽略的 `freshatlas/` 目录内，不会进入 PR。

完成后输出一句话总结：宿舍是否有变化、两张图是否生成成功、PR 链接（若有）、是否已推进缓存。
