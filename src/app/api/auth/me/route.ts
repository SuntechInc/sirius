import { NextResponse } from 'next/server'
import { getSession } from '@/lib/session'
import jwt from 'jsonwebtoken'

export async function GET() {
  try {
    const session = await getSession()
    
    if (!session.token) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      )
    }

    const decoded = jwt.decode(session.token) as any
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      userType: decoded.userType,
      companyId: decoded.companyId,
      actionCompanyId: decoded.actionCompanyId,
      userId: decoded.sub,
      email: decoded.email,
      // todo anothers filds
      ...decoded
    })
  } catch (error) {
    console.error('Erro ao obter informações do usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
} 