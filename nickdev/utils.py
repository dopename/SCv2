from api.serializers import UserLoginSerializer
from django.contrib.auth.models import User
from main.models import CustomUser


def my_jwt_response_handler(token, user=None, request=None):
	current_user = CustomUser.objects.get(user__username=UserLoginSerializer(user, context={'request': request}).data['username'])

	returnData = {
		'token':token,
		'user': {
			'pk':False,
			'username':False,
			#'credential':False,
		}
	}

	if current_user:
		returnData['user']['pk'] = current_user.pk
		returnData['user']['username'] = current_user.user.username
		#returnData['user']['credential'] = current_user.credential

	return returnData