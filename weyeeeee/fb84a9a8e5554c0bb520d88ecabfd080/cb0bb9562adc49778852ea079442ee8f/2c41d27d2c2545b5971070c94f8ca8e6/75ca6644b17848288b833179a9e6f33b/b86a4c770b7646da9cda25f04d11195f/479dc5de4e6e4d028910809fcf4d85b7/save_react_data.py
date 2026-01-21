# 保存React框架调研结果到共享文件，供父任务使用
react_research_data = {
    "framework": "React",
    "component_ecosystem": {
        "ui_libraries": ["Material UI", "Chakra UI", "Ant Design", "Mantine"],
        "lottery_components": "easy to find",
        "custom_component_ease": "easy"
    },
    "animation_support": {
        "built_in_api": "React Transition Group",
        "transition_complexity": "medium",
        "performance_optimization": "基于虚拟DOM的差异化更新、组件级动画隔离"
    }
}
# 保存到共享文件
utils.save_shared_data("react_research_result.json", react_research_data)
print("React调研结果已保存到共享文件")
print(f"数据内容: {react_research_data}")