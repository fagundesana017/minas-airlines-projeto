from rest_framework import serializers
from minasAirlines.models import Airplane, Hangar

class AirplaneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airplane
        fields = ['id', 'matricula', 'numero_Voo', 'modelo', 'procedencia', 'destino', 'numero_passageiros', 'hangar']

class HangarSerializer(serializers.ModelSerializer):
    aeronaves = AirplaneSerializer(many=True, read_only=True)  # Incluindo as aeronaves associadas

    class Meta:
        model = Hangar
        fields = ['id', 'codigo', 'nome', 'tipo', 'capacidade_maxima', 'localizacao', 'aeronaves']

class ListaAeronavesHangarSerializer(serializers.ModelSerializer):
    aeronave_nome = serializers.ReadOnlyField(source='aeronave.modelo')
    class Meta:
        model = Airplane
        fields = ['aeronave_nome', 'registro']


class AeronaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Airplane
        fields = '_all'