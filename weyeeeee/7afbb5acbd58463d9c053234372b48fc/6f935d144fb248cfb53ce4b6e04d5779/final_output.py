state = utils.get_block_state("integrate_summary")
if state.get("success"):
    print(state.get("summary"))
    utils.set_state(success=True, result=state.get("summary"))
else:
    utils.set_state(success=False, error="摘要整合失败")