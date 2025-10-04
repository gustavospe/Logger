'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart3, 
  Globe, 
  Settings, 
  LogOut, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  Copy,
  ExternalLink
} from 'lucide-react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleCopySubdomain = () => {
    const subdomainUrl = `https://${session.user.subdomain}.logger.com`;
    navigator.clipboard.writeText(subdomainUrl);
    // Aqui você pode adicionar uma notificação de sucesso
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Logger Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Bem-vindo, {session.user.name}
              </div>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Requests
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Nenhum request ainda
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Uptime
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">
                  Sistema online
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Alertas Ativos
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">
                  Nenhum alerta
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Plano Atual
                </CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Badge variant={session.user.plan === 'pro' ? 'default' : 'secondary'}>
                    {session.user.plan === 'starter' ? 'Starter' : 
                     session.user.plan === 'pro' ? 'Pro' : 'Enterprise'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Setup Instructions */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Configuração do seu Logger
                  </CardTitle>
                  <CardDescription>
                    Configure sua aplicação para começar a receber logs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">1. Seu Subdomínio</h3>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <code className="flex-1 text-sm">
                        https://{session.user.subdomain}.logger.com
                      </code>
                      <Button size="sm" variant="outline" onClick={handleCopySubdomain}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Este é o endereço que você deve usar no lugar da sua API
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-2">2. Configurar API Endpoint</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Cadastre o endpoint da sua API real para onde queremos redirecionar as requisições
                    </p>
                    <Button className="w-full sm:w-auto">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar Endpoint
                    </Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-2">3. Começar a Monitorar</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Após configurar, suas requisições começarão a aparecer no dashboard
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Documentação
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                  <CardDescription>
                    Gerencie sua conta e configurações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações da Conta
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Globe className="h-4 w-4 mr-2" />
                    Gerenciar Subdomínios
                  </Button>
                  <Button className="w-full" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Configurar Alertas
                  </Button>
                  <Button className="w-full" variant="outline">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Fazer Upgrade do Plano
                  </Button>
                </CardContent>
              </Card>

              {/* Account Info */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Informações da Conta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {session.user.email}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Subdomínio</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {session.user.subdomain}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Plano</div>
                    <Badge variant={session.user.plan === 'pro' ? 'default' : 'secondary'}>
                      {session.user.plan === 'starter' ? 'Starter' : 
                       session.user.plan === 'pro' ? 'Pro' : 'Enterprise'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
