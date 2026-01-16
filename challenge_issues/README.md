# Agentic AI Challenge - GitHub Issues

Este directorio contiene todas las issues para el desafío Agentic AI.

## 📋 Issues Creadas

1. **Issue #1**: Project Setup and Vercel Configuration
2. **Issue #2**: Authentication System with Login Page
3. **Issue #3**: Mock Database for User Profiles
4. **Issue #4**: Mock Backend API Service
5. **Issue #5**: User Profiles Dashboard Page
6. **Issue #6**: User Profile Card Component
7. **Issue #7**: Search and Filter Functionality
8. **Issue #8**: Responsive Navigation and Layout
9. **Issue #9**: Loading States and Error Handling
10. **Issue #10**: Documentation and Deployment Guide

## 🚀 Cómo Usar

### 1. Crear las Issues en GitHub

Para cada archivo `issue_XX.md`:

1. Ve a: https://github.com/cingolani-patagonian/agentic/issues/new
2. Copia el contenido del archivo
3. Pega en GitHub (el título y labels están incluidos)
4. Crea la issue

### 2. Ejecutar ADW para cada Issue

```bash
cd adws/

# Ejecutar en orden
uv run adw_sdlc_iso.py 1
uv run adw_sdlc_iso.py 2
uv run adw_sdlc_iso.py 3
# ... continúa con todas
```

### 3. Orden de Ejecución Recomendado

1. Issue #1 - Setup del proyecto (base)
2. Issue #3 - Mock database (datos)
3. Issue #4 - Mock API (lógica)
4. Issue #2 - Authentication (seguridad)
5. Issue #6 - UserCard component (componente)
6. Issue #5 - Dashboard (página principal)
7. Issue #7 - Search/Filter (mejoras)
8. Issue #8 - Navigation (navegación)
9. Issue #9 - Loading/Errors (robustez)
10. Issue #10 - Documentation (deployment)

## 📧 Información para el Email Final

**Para:** agentic.challenge@patagonian.com

**Subject:** Final Agentic AI Challenge

**Contenido:**

```
URL de issues de GitHub resueltas:
https://github.com/cingolani-patagonian/agentic/issues
Issues: #1, #2, #3, #4, #5, #6, #7, #8, #9, #10

URL de Vercel donde está desplegada la aplicación:
[Completar después del deployment]

URL del repositorio en GitHub:
https://github.com/cingolani-patagonian/agentic

---

Evidencia de Agentes Autónomos:

1. Todos los commits muestran co-autoría: "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
2. Los PRs fueron generados automáticamente por el sistema ADW
3. Los logs de ejecución de agentes están en el directorio agents/{adw_id}/
4. Las branches siguen el patrón: feat-{issue}-{adw_id}-{descripción}
5. Comentarios automáticos del sistema ADW en cada issue
```

## 🤖 Evidencia de Agentes Autónomos

El sistema ADW demuestra el uso de agentes autónomos mediante:

- ✅ **Commits automáticos** con co-autoría de Claude Sonnet 4.5
- ✅ **Pull Requests generados** automáticamente con descripciones técnicas
- ✅ **Logs de agentes** guardados en `agents/{adw_id}/`
- ✅ **Branches automáticos** con formato consistente
- ✅ **Comentarios en issues** del sistema ADW mostrando progreso
- ✅ **Worktrees aislados** para ejecución paralela sin conflictos

## 📦 Aplicación Final

La aplicación incluirá:

- ✅ Login page con autenticación mock
- ✅ Dashboard con cards de perfiles de usuarios
- ✅ Backend mockeado (API service)
- ✅ Database mockeada (20-30 usuarios)
- ✅ Búsqueda y filtros
- ✅ Diseño responsive con Tailwind CSS
- ✅ Deploy en Vercel
- ✅ Documentación completa
