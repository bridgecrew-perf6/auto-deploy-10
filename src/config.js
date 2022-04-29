/**
 * Created by JackCui on 2022/4/28
 */

const project = 'fe-inner'

const accountConfig = {
  gitlab: {
    userName: 'cuijie.cj',
    password: 'Cuijie12.'
  },
  jenkins: {
    userName: 'cuijie.cj',
    password: 'Cuijie12.'
  }
}

const branchConfig = {
  develop: 'f_jie.cui',
  projectMerge: 'f_paas_design_v3.1',
  merge: 'p_dev_merge'
}

exports.config = {
  project,
  accountConfig,
  branchConfig
}
