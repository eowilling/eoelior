incentive = utils.get_persistent_state('incentive_result')
fairness = utils.get_persistent_state('fairness_result')
experience = utils.get_persistent_state('experience_result')
summary = f"""用第一性原理分析，尾牙抽奖系统核心需求本质是**企业文化落地的情感连接载体**。从三维度切入：  
1. **激励员工**：需物质与精神双重强化（{incentive}），将“关怀”转为可感知价值认同；  
2. **保障公平**：靠透明可验（{fairness}），消除信任成本立公信力；  
3. **优化体验**：重参与惊喜（{experience}），提升投入与记忆点。  
系统作为文化工具的核心价值，是将抽象关怀具象为可参与互动，通过“被看见、被公平对待、被惊喜打动”的体验，强化员工归属感，让文化从“口号”变“体感”。"""
utils.set_state(success=True, summary=summary)