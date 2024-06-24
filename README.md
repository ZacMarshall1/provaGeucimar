# Projeto base para Avaliação A1

## Orientações para rodar o projeto

a) Fazer o download do arquivo .zip ou clonar o repositório:

```
git clone https://gitlab.com/gilbriatore/2024/prj-a1.git
```

b) Abrir o folder Prj-A1/back no Visual Code e rodar o backend:

```
dotnet ef migrations add "CriarBanco"
dotnet ef database update
dotnet run
```

b) Abrir o folder Prj-A1/front em outra janela do Visual Code e rodar o fontend:

```
npm install
npm start
```
