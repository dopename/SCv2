from .views import *

from django.urls import path

urlpatterns = [
	path('users/', UserAPIView.as_view(), name="users"),

	path('destroy/industry/<int:pk>/', IndustryDestroyView.as_view(), name="industry-destroy-view"),
	path('industry/<int:pk>/', IndustryUpdateRetrieveView.as_view(), name="industry-update-retrieve-view"),
	path('create/industry/', IndustryCreateView.as_view(), name="industry-create-view"),

	path('destroy/category/<int:pk>/', CategoryDestroyView.as_view(), name="category-destroy-view"),
	path('category/<int:pk>/', CategoryUpdateRetrieveView.as_view(), name="category-update-retrieve-view"),
	path('create/category', CategoryCreateView.as_view(), name="category-create-view"),

	path('destroy/medialocation/<int:pk>/', MediaLocationDestroyView.as_view(), name="medialocation-destroy-view"),
	path('medialocation/<int:pk>/', MediaLocationUpdateRetrieveView.as_view(), name="medialocation-update-retrieve-view"),
	path('create/medialocation/', MediaLocationCreateView.as_view(), name="medialocation-create-view"),

	path('destroy/media/<int:pk>/', MediaDestroyView.as_view(), name="media-destroy-view"),
	path('media/<int:pk>/', MediaUpdateRetrieveView.as_view(), name="media-update-retrieve-view"),
	path('create/media/', MediaCreateView.as_view(), name="media-create-view"),

	path('destroy/solutionmedia/<int:pk>/', SolutionMediaDestroyView.as_view(), name="solutionmedia-destroy-view"),
	path('solutionmedia/<int:pk>/', SolutionMediaUpdateRetrieveView.as_view(), name="solutionmedia-update-retrieve-view"),
	path('create/solutionmedia/', SolutionMediaCreateView.as_view(), name="solutionmedia-create-view"),

	path('destroy/tagtype/<int:pk>/', TagType.as_view(), name="tagtype-destroy-view"),
	path('tagtype/<int:pk>/', TagTypeUpdateRetrieveView.as_view(), name="tagtype-update-retrieve-view"),
	path('create/tagtype/', TagTypeCreateView.as_view(), name="tagtype-create-view"),

	path('destroy/tag/<int:pk>/', TagDestroyView.as_view(), name="tag-destroy-view"),
	path('tag/<int:pk>/', TagUpdateRetrieveView.as_view(), name="tag-update-retrieve-view"),
	path('create/tag', TagCreateView.as_view(), name="tag-create-view"),

	path('destroy/provider/<int:pk>/', ProviderDestroyView.as_view(), name="provider-destroy-view"),
	path('provider/<int:pk>/', ProviderUpdateRetrieveView.as_view(), name="provider-update-retrieve-view"),
	path('create/provider/', ProviderCreateView.as_view(), name="provider-create-view"),

	path('provideraccount/<int:pk>/', ProviderAccountUpdateRetrieveView.as_view(), name="provideraccount-update-retrieve-view"),
	path('create/provideraccount/', ProviderAccountCreateView.as_view(), name="provideraccount-create-view"),

	path('seekeraccount/<int:pk>/', SeekerAccountUpdateRetrieveView.as_view(), name="seekeraccount-update-retrieve-view"),
	path('create/seekeraccount/', SeekerAccountCreateView.as_view(), name="seekeraccount-create-view"),

	path('destroy/solution/<int:pk>/', SolutionDestroyView.as_view(), name="solution-destroy-view"),
	path('solution/<int:pk>/', SolutionUpdateRetrieveView.as_view(), name="solution-update-retrieve-view"),
	path('create/solution/', SolutionCreateView.as_view(), name="solution-create-view"),
]