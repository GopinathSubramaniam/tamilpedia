from tamilpedia.app.models import App


class Util:
    def get_res(data, code=App.STATUS, msg=''):
        return {
            'status_code': code,
            'status_msg': msg,
            'data': data
        }
