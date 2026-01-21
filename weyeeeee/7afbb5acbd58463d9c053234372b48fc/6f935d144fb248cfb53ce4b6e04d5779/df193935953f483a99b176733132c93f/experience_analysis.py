import utils
# 分析优化体验维度的核心需求本质（第一性原理）
# 低门槛参与（批量导入）降低参与成本，高惊喜感（随机动画）放大随机乐趣，强仪式感（科技UI）强化情感共鸣，共同提升投入与记忆点
# 提炼100字内结论
conclusion = "从优化体验维度，尾牙抽奖系统核心需求本质是通过低门槛参与（批量导入）、高惊喜感（随机动画）、强仪式感（科技UI），降参与成本、放随机乐趣、强情感共鸣，提升员工投入与记忆点。"
# 存储到session state
utils.set_persistent_state(experience_result=conclusion)
# 输出结论（供用户查看）
print(f"体验分析结果：{conclusion}")
print("已将结论存储至session state（key: experience_result）")