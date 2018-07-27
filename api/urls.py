from .views import *

from django.urls import path

urlpatterns = [
	path('users/', UserAPIView.as_view(), name="users"),

	path("auth/user/", UserAPI.as_view()),
	path("auth/register/", RegistrationAPI.as_view()),
	path("auth/login/", LoginAPI.as_view()),

	path('destroy/industry/<int:pk>/', IndustryDestroyView.as_view(), name="industry-destroy-view"),
	path('create/industry/', IndustryCreateView.as_view(), name="industry-create-view"),
	path('list/industry/', IndustryListView.as_view(), name="industry-list-view"),
	path('industry/<int:pk>/', IndustryUpdateRetrieveView.as_view(), name="industry-update-retrieve-view"),

	path('destroy/category/<int:pk>/', CategoryDestroyView.as_view(), name="category-destroy-view"),
	path('create/category', CategoryCreateView.as_view(), name="category-create-view"),
	path('list/category/', CategoryListView.as_view(), name="category-list-view"),
	path('category/<int:pk>/', CategoryUpdateRetrieveView.as_view(), name="category-update-retrieve-view"),

	path('destroy/medialocation/<int:pk>/', MediaLocationDestroyView.as_view(), name="medialocation-destroy-view"),
	path('medialocation/<int:pk>/', MediaLocationUpdateRetrieveView.as_view(), name="medialocation-update-retrieve-view"),
	path('create/medialocation/', MediaLocationCreateView.as_view(), name="medialocation-create-view"),

	path('destroy/media/<int:pk>/', MediaDestroyView.as_view(), name="media-destroy-view"),
	path('media/<int:pk>/', MediaUpdateRetrieveView.as_view(), name="media-update-retrieve-view"),
	path('create/media/', MediaCreateView.as_view(), name="media-create-view"),

	path('destroy/solutionmedia/<int:pk>/', SolutionMediaDestroyView.as_view(), name="solutionmedia-destroy-view"),
	path('solutionmedia/<int:pk>/', SolutionMediaUpdateRetrieveView.as_view(), name="solutionmedia-update-retrieve-view"),
	path('create/solutionmedia/', SolutionMediaCreateView.as_view(), name="solutionmedia-create-view"),

	path('destroy/tagtype/<int:pk>/', TagTypeDestroyView.as_view(), name="tagtype-destroy-view"),
	path('tagtype/<int:pk>/', TagTypeUpdateRetrieveView.as_view(), name="tagtype-update-retrieve-view"),
	path('create/tagtype/', TagTypeCreateView.as_view(), name="tagtype-create-view"),

	path('destroy/tag/<int:pk>/', TagDestroyView.as_view(), name="tag-destroy-view"),
	path('update/tag/<int:pk>/', TagUpdateRetrieveView.as_view(), name="tag-update-retrieve-view"),
	path('create/tag', TagCreateView.as_view(), name="tag-create-view"),
	path('list/tag/', TagListView.as_view(), name="tag-list-view"),

	path('destroy/provider/<int:pk>/', ProviderDestroyView.as_view(), name="provider-destroy-view"),
	path('provider/<int:pk>/', ProviderUpdateRetrieveView.as_view(), name="provider-update-retrieve-view"),
	path('create/provider/', ProviderCreateView.as_view(), name="provider-create-view"),

	path('provideraccount/<int:pk>/', ProviderAccountUpdateRetrieveView.as_view(), name="provideraccount-update-retrieve-view"),
	path('create/provideraccount/', ProviderAccountCreateView.as_view(), name="provideraccount-create-view"),

	path('seekeraccount/<int:pk>/', SeekerAccountRetrieveView.as_view(), name="seekeraccount-update-retrieve-view"),
	path('create/seekeraccount/', SeekerAccountCreateView.as_view(), name="seekeraccount-create-view"),
	path('update/seekeraccount/<int:pk>/', SeekerAccountUpdateView.as_view(), name="seekeraccount-update-view"),

	path('destroy/solution/<int:pk>/', SolutionDestroyView.as_view(), name="solution-destroy-view"),
	path('list/solution/', SolutionListView.as_view(), name="solution-list-view"),
	path('create/solution/', SolutionCreateView.as_view(), name="solution-create-view"),
	path('solution/<int:pk>/', SolutionUpdateRetrieveView.as_view(), name="solution-update-retrieve-view"),
]