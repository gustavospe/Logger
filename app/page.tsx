import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Shield, Zap, Users, Globe, ArrowRight, CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <BarChart3 className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg">Logger</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Recursos
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Preços
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/auth/login">
            Login
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline" className="mb-4">
                  🚀 Monitore suas APIs em tempo real
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  API Logger Inteligente
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Monitore, analise e otimize suas APIs com dashboards em tempo real. 
                  Cada cliente tem seu próprio subdomínio personalizado para logs centralizados.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/auth/register">
                    Começar Gratuitamente
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#features">Ver Demonstração</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Recursos Principais</h2>
              <p className="text-gray-500 md:text-lg dark:text-gray-400 mt-4">
                Tudo que você precisa para monitorar suas APIs profissionalmente
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Globe className="h-8 w-8 mb-2 text-blue-600" />
                  <CardTitle>Subdomínios Personalizados</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Cada cliente recebe seu próprio subdomínio (cliente.seulogger.com) 
                    para logs completamente isolados e organizados.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 mb-2 text-green-600" />
                  <CardTitle>Analytics em Tempo Real</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Dashboards interativos com métricas de performance, 
                    tempo de resposta, códigos de erro e muito mais.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 mb-2 text-purple-600" />
                  <CardTitle>Alertas Inteligentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Receba notificações automáticas sobre falhas, 
                    picos de latência ou padrões anômalos nas suas APIs.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 mb-2 text-yellow-600" />
                  <CardTitle>Proxy Transparente</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Redirecionamento automático das requisições para sua API 
                    com logging completo sem afetar a performance.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-red-600" />
                  <CardTitle>Multi-tenant</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Arquitetura multi-inquilino completa com isolamento 
                    de dados e configurações personalizadas por cliente.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CheckCircle className="h-8 w-8 mb-2 text-emerald-600" />
                  <CardTitle>Fácil Integração</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Configure em minutos! Apenas altere o endpoint da sua API 
                    para o subdomínio fornecido e comece a monitorar.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Planos e Preços</h2>
              <p className="text-gray-500 md:text-lg dark:text-gray-400 mt-4">
                Escolha o plano ideal para o tamanho do seu projeto
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-center">Starter</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">Grátis</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li>✅ 1 subdomínio</li>
                    <li>✅ 1.000 requests/mês</li>
                    <li>✅ 7 dias de retenção</li>
                    <li>✅ Dashboard básico</li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="relative border-blue-500 border-2">
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  Mais Popular
                </Badge>
                <CardHeader>
                  <CardTitle className="text-center">Pro</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">R$ 29</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li>✅ 5 subdomínios</li>
                    <li>✅ 100.000 requests/mês</li>
                    <li>✅ 30 dias de retenção</li>
                    <li>✅ Alertas avançados</li>
                    <li>✅ Analytics completos</li>
                  </ul>
                  <Button className="w-full mt-4">
                    Escolher Pro
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Enterprise</CardTitle>
                  <div className="text-center">
                    <span className="text-3xl font-bold">R$ 99</span>
                    <span className="text-gray-500">/mês</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <ul className="space-y-2 text-sm">
                    <li>✅ Subdomínios ilimitados</li>
                    <li>✅ Requests ilimitados</li>
                    <li>✅ 90 dias de retenção</li>
                    <li>✅ Suporte prioritário</li>
                    <li>✅ White-label</li>
                  </ul>
                  <Button className="w-full mt-4" variant="outline">
                    Falar com Vendas
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Pronto para Começar?
                </h2>
                <p className="mx-auto max-w-[600px] text-blue-100 md:text-xl">
                  Comece a monitorar suas APIs hoje mesmo. Configure em minutos, 
                  insights em tempo real.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/auth/register">
                    Criar Conta Gratuita
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Logger. Todos os direitos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Termos de Serviço
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
