const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  w_id: state => state.warehouse.w_id,
  w_aid: state => state.warehouse.w_aid,
  w_content: state => state.warehouse.w_content,
  w_remarks: state => state.warehouse.w_remarks,
  w_snumber: state => state.warehouse.w_snumber,
}
export default getters
