# from django.shortcuts import render
from .serializers  import AirplaneSerializer, HangarSerializer, ListaAeronavesHangarSerializer
from rest_framework import viewsets, generics
from .models import Hangar, Airplane


class HangarViewSet(viewsets.ModelViewSet):
    queryset = Hangar.objects.all()
    serializer_class = HangarSerializer

class AeronaveViewSet(viewsets.ModelViewSet):
    queryset = Airplane.objects.all()
    serializer_class = AirplaneSerializer

class ListaAeronavesHangar(generics.ListAPIView):
    serializer_class = AirplaneSerializer

    def get_queryset(self):
        hangar_id = self.kwargs['pk']
        return Airplane.objects.filter(hangar_id=hangar_id)

        