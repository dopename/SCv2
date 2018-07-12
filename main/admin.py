from django.contrib import admin
from main.models import CustomUser, Industry, Category, MediaLocation, Media, SolutionMedia,\
	TagType, Tag, Provider, ProviderAccount, SeekerAccount, Solution, TeamMember

admin.site.register(CustomUser)
admin.site.register(Industry)
admin.site.register(Category)
admin.site.register(MediaLocation)
admin.site.register(Media)
admin.site.register(SolutionMedia)
admin.site.register(TagType)
admin.site.register(Tag)
admin.site.register(Provider)
admin.site.register(ProviderAccount)
admin.site.register(SeekerAccount)
admin.site.register(Solution)
admin.site.register(TeamMember)
