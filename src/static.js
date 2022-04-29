/**
 * Created by JackCui on 2022/4/28
 */

exports.urlLogin = {
  jenkins: 'http://deploy.sunyur.com/login?from=/',
  gitlab: 'http://gitlab.sunyur.com/users/sign_in'
}

exports.mergeBranchUrl = (project, from, to) => `http://gitlab.sunyur.com/sunyur_fe_code/${project}/merge_requests/new?merge_request[&merge_request[source_branch]=${from}&merge_request[target_branch]=${to}`
 