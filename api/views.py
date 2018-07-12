from rest_framework import generics, mixins, status, permissions
from django.contrib.auth.models import User
from main.models import CustomUser, Industry, Category, MediaLocation, Media, SolutionMedia,\
	TagType, Tag, Provider, ProviderAccount, SeekerAccount, Solution
from .serializers  import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from rest_framework.response import Response
from rest_framework.authentication import get_authorization_header, BaseAuthentication
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

import datetime
import dateutil.relativedelta


jwt_decode_handler = api_settings.JWT_DECODE_HANDLER

class UserAPIView(generics.ListAPIView):
	serializer_class = UserSerializer

	def get_queryset(self):
		return CustomUser.objects.all()

#/--------------------------------------------------------------/

class IndustryUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = IndustrySerializer

	def get_queryset(self):
		qs = Industry.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class IndustryCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = IndustryCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = Industry.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class IndustryDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = IndustryDestroySerializer

	def get_queryset(self):
		qs = Industry.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

#/--------------------------------------------------------------/

class CategoryUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = CategorySerializer

	def get_queryset(self):
		qs = Category.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class CategoryCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = CategoryCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = Category.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class CategoryDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = CategoryDestroySerializer

	def get_queryset(self):
		qs = Category.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		
#/--------------------------------------------------------------/

class MediaLocationUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = MediaLocationSerializer

	def get_queryset(self):
		qs = Industry.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class MediaLocationCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = MediaLocationCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = MediaLocation.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class MediaLocationDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = MediaLocationDestroySerializer

	def get_queryset(self):
		qs = MediaLocation.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		
#/--------------------------------------------------------------/

class MediaUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = MediaSerializer

	def get_queryset(self):
		qs = Media.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class MediaCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = MediaCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = Media.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class MediaDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = MediaDestroySerializer

	def get_queryset(self):
		qs = Media.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		
#/--------------------------------------------------------------/

class SolutionMediaUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = SolutionMediaSerializer

	def get_queryset(self):
		qs = SolutionMedia.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class SolutionMediaCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = SolutionMediaCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = SolutionMedia.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class SolutionMediaDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = SolutionMediaDestroySerializer

	def get_queryset(self):
		qs = SolutionMedia.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		
#/--------------------------------------------------------------/

class TagTypeUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = TagTypeSerializer

	def get_queryset(self):
		qs = TagType.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class TagTypeCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = TagTypeCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = TagType.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class TagTypeDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = TagTypeDestroySerializer

	def get_queryset(self):
		qs = TagType.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		
#/--------------------------------------------------------------/

class TagUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = TagSerializer

	def get_queryset(self):
		qs = Tag.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class TagCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = TagCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = Tag.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class TagDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = TagDestroySerializer

	def get_queryset(self):
		qs = Tag.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		
#/--------------------------------------------------------------/

class ProviderUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = ProviderSerializer

	def get_queryset(self):
		qs = Provider.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class ProviderCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = ProviderCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = Provider.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class ProviderDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = ProviderDestroySerializer

	def get_queryset(self):
		qs = Provider.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

class ProviderUpdateViewsView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = ProviderUpdateViewsSerializer

	def get_queryset(self):
		qs = Provider.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		


#/--------------------------------------------------------------/

class ProviderAccountUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = ProviderAccountSerializer

	def get_queryset(self):
		qs = ProviderAccount.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class ProviderAccountCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = ProviderAccountCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = ProviderAccount.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

# class ProviderAccountDestroyView(generics.DestroyAPIView):
# 	lookup_field = 'pk'
# 	serializer_class = ProviderAccountDestroySerializer

# 	def get_queryset(self):
# 		qs = ProviderAccount.objects.all()
# 		query = self.request.GET.get('q')
# 		if query is not None:
# 			qs = qs.filter(pk=query)
# 		return qs
		
#/--------------------------------------------------------------/

class SeekerAccountUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = SeekerAccountSerializer

	def get_queryset(self):
		qs = SeekerAccount.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class SeekerAccountCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = SeekerAccountCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = SeekerAccount.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

# class SeekerAccountDestroyView(generics.DestroyAPIView):
# 	lookup_field = 'pk'
# 	serializer_class = SeekerAccountDestroySerializer

# 	def get_queryset(self):
# 		qs = SeekerAccount.objects.all()
# 		query = self.request.GET.get('q')
# 		if query is not None:
# 			qs = qs.filter(pk=query)
# 		return qs
		
#/--------------------------------------------------------------/

class SolutionUpdateRetrieveView(generics.RetrieveUpdateAPIView):
	lookup_field = 'pk'
	serializer_class = SolutionSerializer

	def get_queryset(self):
		qs = Solution.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs


class SolutionCreateView(generics.CreateAPIView):
	lookup_field = 'pk'
	serializer_class = SolutionCreateSerializer
	# queryset = Solution.objects.all()

	def get_queryset(self):
		qs = Solution.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

class SolutionDestroyView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = SolutionDestroySerializer

	def get_queryset(self):
		qs = Solution.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		
class SolutionUpdateViewsView(generics.DestroyAPIView):
	lookup_field = 'pk'
	serializer_class = SolutionUpdateViewsSerializer

	def get_queryset(self):
		qs = Solution.objects.all()
		query = self.request.GET.get('q')
		if query is not None:
			qs = qs.filter(pk=query)
		return qs
		