// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "BUPT 生存手册",
      customCss: [
        // 添加自定义 CSS 来控制 hero 图片尺寸
        './src/styles/custom.css',
      ],
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      editLink: {
        baseUrl: "https://github.com/byrdocs/SurviveBUPTManual/edit/main/",
      },
      // 启用最近更新时间显示
      lastUpdated: true,
      // 可选：自定义日期格式
      // 更多配置选项可以在这里添加
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/byrdocs/SurviveBUPTManual",
        },
      ],
      sidebar: [
        {
          label: "新生入学",
          items: [
            { label: "序", slug: "新生入学/新生入学" },
            { label: "防范诈骗", slug: "新生入学/防范诈骗" },
            { label: "开学考试", slug: "新生入学/开学考试" },
          ],
        },
        {
          label: "学习生活",
          items: [
            { label: "序", slug: "学习生活/学习生活" },
            { label: "校历课表", slug: "学习生活/校历课表" },
            { label: "课程安排", slug: "学习生活/课程安排" },
            { label: "成绩构成", slug: "学习生活/成绩构成" },
            { label: "毕业要求", slug: "学习生活/毕业要求" },
            { label: "转专业", slug: "学习生活/转专业" },
            { label: "校园网", slug: "学习生活/校园网" },
            { label: "常用网站", slug: "学习生活/常用网站" },
            { label: "学生组织", slug: "学习生活/学生组织" },
            { label: "未尽事宜", slug: "学习生活/未尽事宜" },
          ],
        },
        { label: "校区迁移", slug: "校区迁移" },
        {
          label: "沙河校区",
          items: [
            { label: "序", slug: "沙河校区/沙河校区" },
            { label: "住宿条件", slug: "沙河校区/住宿条件" },
            { label: "生活服务", slug: "沙河校区/生活服务" },
            { label: "餐饮美食", slug: "沙河校区/餐饮美食" },
            { label: "日常活动", slug: "沙河校区/日常活动" },
            { label: "交通运输", slug: "沙河校区/交通运输" },
            { label: "新生军训", slug: "沙河校区/新生军训" },
          ],
        },
        {
          label: "海淀校区",
          items: [
            { label: "序", slug: "海淀校区/海淀校区" },
            { label: "住宿条件", slug: "海淀校区/住宿条件" },
            { label: "生活服务", slug: "海淀校区/生活服务" },
            { label: "餐饮美食", slug: "海淀校区/餐饮美食" },
            { label: "日常活动", slug: "海淀校区/日常活动" },
            { label: "交通运输", slug: "海淀校区/交通运输" },
          ],
        },
        { label: "行话辞典", slug: "行话辞典" },
        {
          label: "贡献指南",
          slug: "contributing",
        },
        {
          label: "致谢",
          slug: "acknowledgments",
        },
      ],
    }),
  ],
});
