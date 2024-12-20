from django.db import models

class Hangar(models.Model):
    TIPOS = (
        ('P', 'Pequeno'),
        ('M', 'Médio'),
        ('G', 'Grande'),
    )
    codigo = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=100, blank=False)
    tipo = models.CharField(max_length=1, choices=TIPOS, blank=False, default='P')
    capacidade_maxima = models.IntegerField(help_text="Capacidade máxima de aeronaves que o hangar pode comportar")
    localizacao = models.CharField(max_length=255, help_text="Localização específica do hangar no aeroporto", blank=False)

    def __str__(self):
        return f'{self.nome} ({self.codigo})'
class Airplane(models.Model):
    matricula = models.CharField(max_length=5)
    numero_Voo = models.CharField(max_length=4)
    modelo = models.CharField(max_length=4)
    procedencia = models.CharField(max_length=3)
    destino = models.CharField(max_length=3)
    numero_passageiros = models.IntegerField(null=True)
    hangar = models.ForeignKey(Hangar, related_name='aeronaves', on_delete=models.CASCADE, default=1) 

    def __str__(self):
        return f"{self.modelo} ({self.matricula})"

