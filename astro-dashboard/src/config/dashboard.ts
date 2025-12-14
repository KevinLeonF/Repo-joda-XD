import { Icons } from '@/components/Icons'

export const navigation = [
  { name: 'Muebles', href: '/dashboard/dashboard', icon: Icons.Home },
  { name: 'Crear Mueble', href: '/dashboard/crear-mueble/mueble', icon: Icons.Users },
  { name: 'Listar Muebles', href: '/dashboard/listar-muebles/muebles', icon: Icons.Folder },
  { name: 'Crear Categoria', href: '/dashboard/crear-categoria/categoria', icon: Icons.Calendar },
  { name: 'Listar Categoria', href: '/dashboard/documents', icon: Icons.Document },
]

export const teams = [
  { id: 1, name: 'Avengers', href: '/dashboard/team/avengers', initial: 'A', current: false },
  // { id: 2, name: 'Team 2', href: '#', initial: 'T', current: false },
  // { id: 3, name: 'Developer Hangout', href: '#', initial: 'W', current: false },
]
