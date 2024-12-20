from django.contrib import admin
from minasAirlines.models import Airplane, Hangar

# Configuração para Airplane
class AirplaneAdmin(admin.ModelAdmin):
    list_display = ('id', 'matricula', 'numero_Voo', 'modelo', 'procedencia', 'destino', 'numero_passageiros')
    list_display_links = ('id', 'matricula',)
    search_fields = ('matricula', 'modelo', 'numero_Voo')
    list_filter = ('procedencia', 'destino')  # Filtros adicionais na barra lateral

admin.site.register(Airplane, AirplaneAdmin)

# Configuração para Hangar
class HangarAdmin(admin.ModelAdmin):
    list_display = ('id', 'codigo', 'nome', 'tipo', 'capacidade_maxima', 'localizacao')
    list_display_links = ('id', 'codigo',)
    search_fields = ('codigo', 'nome', 'localizacao')
    list_filter = ('tipo',)  # Filtro por tipo de hangar

admin.site.register(Hangar, HangarAdmin)
