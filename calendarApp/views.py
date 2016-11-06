from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return HttpResponse("This is the Calendar App Index.")
# Create your views here.
