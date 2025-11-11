import { Spline } from "lucide-react";
import Link from "next/link";

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="w-full border-b border-text-muted/20">
        <div className="w-full max-w-4xl py-5 mx-auto px-5">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="flex items-center rounded-md p-1 bg-primary">
              <Spline className="size-4 text-foreground" />
            </div>
            <span className="text-foreground font-bold">IndieHub</span>
          </Link>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-5 py-10">
        <article className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Política de Privacidade
          </h1>
          <p className="text-muted-foreground mb-8">
            Última atualização:{" "}
            {new Date().toLocaleDateString("pt-BR", {
              month: "long",
              year: "numeric",
            })}
          </p>

          <section className="space-y-6 text-muted-foreground">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                1. Introdução
              </h2>
              <p className="mb-4">
                O <strong>IndieHub</strong> ("nós", "nosso" ou "plataforma")
                está comprometido em proteger sua privacidade e garantir a
                segurança de seus dados pessoais. Esta Política de Privacidade
                descreve como coletamos, usamos, armazenamos e protegemos suas
                informações quando você utiliza nossa plataforma de criação de
                portfólio e links curtos com analytics.
              </p>
              <p className="mb-4">
                Esta política está em conformidade com a Lei Geral de Proteção
                de Dados (LGPD - Lei nº 13.709/2018) e outras leis aplicáveis de
                proteção de dados.
              </p>
              <p>
                Ao usar o IndieHub, você concorda com as práticas descritas
                nesta Política de Privacidade. Se você não concordar, por favor,
                não utilize nossos serviços.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                2. Coleta de Dados
              </h2>
              <p className="mb-4">
                Coletamos diferentes tipos de informações para fornecer e
                melhorar nossos serviços:
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                2.1. Dados Fornecidos pelo Usuário
              </h3>
              <p className="mb-4">
                Quando você se cadastra ou usa o IndieHub, coletamos:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Informações de Conta:</strong> Nome completo, endereço
                  de e-mail, senha (criptografada) e outras informações de
                  perfil que você optar por fornecer
                </li>
                <li>
                  <strong>Informações de Pagamento:</strong> Dados de cartão de
                  crédito, informações de faturamento e histórico de transações
                  (processados por gateways de pagamento seguros terceirizados)
                </li>
                <li>
                  <strong>Conteúdo Criado:</strong> Links, projetos, descrições,
                  imagens e outros conteúdos que você criar ou compartilhar em
                  sua página de portfólio
                </li>
                <li>
                  <strong>Preferências:</strong> Configurações de conta,
                  preferências de notificação e personalizações
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                2.2. Dados Coletados Automaticamente
              </h3>
              <p className="mb-4">
                Quando você usa o IndieHub, coletamos automaticamente:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Dados de Uso:</strong> Informações sobre como você
                  interage com a plataforma, páginas visitadas, tempo de
                  permanência e funcionalidades utilizadas
                </li>
                <li>
                  <strong>Estatísticas de Links:</strong> Número de cliques,
                  origem dos acessos (referrers), localização geográfica
                  aproximada dos visitantes, dispositivos utilizados e horários
                  de acesso
                </li>
                <li>
                  <strong>Dados Técnicos:</strong> Endereço IP, tipo de
                  navegador, sistema operacional, resolução de tela e
                  identificadores de dispositivo
                </li>
                <li>
                  <strong>Logs do Sistema:</strong> Registros de atividades,
                  erros e eventos de segurança
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                2.3. Cookies e Tecnologias de Rastreamento
              </h3>
              <p className="mb-4">
                Utilizamos cookies e tecnologias similares para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Manter você conectado à sua conta</li>
                <li>Lembrar suas preferências e configurações</li>
                <li>Analisar o uso da plataforma e melhorar nossos serviços</li>
                <li>
                  Fornecer funcionalidades de analytics e rastreamento de links
                </li>
                <li>Personalizar sua experiência</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                3. Uso das Informações
              </h2>
              <p className="mb-4">
                Utilizamos seus dados para os seguintes propósitos:
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                3.1. Prestação de Serviços
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Criar e gerenciar sua conta e página de portfólio</li>
                <li>Gerar e gerenciar links curtos personalizados</li>
                <li>
                  Fornecer funcionalidades de analytics e rastreamento de
                  visitas
                </li>
                <li>Processar pagamentos e gerenciar assinaturas</li>
                <li>Enviar notificações relacionadas ao serviço</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                3.2. Melhoria e Desenvolvimento
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Analisar padrões de uso para melhorar a plataforma</li>
                <li>Desenvolver novos recursos e funcionalidades</li>
                <li>Realizar testes e pesquisas de usabilidade</li>
                <li>Otimizar o desempenho e a segurança do serviço</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                3.3. Comunicação
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Enviar atualizações sobre o serviço e mudanças importantes
                </li>
                <li>Responder a suas solicitações e fornecer suporte</li>
                <li>
                  Enviar comunicações de marketing (com seu consentimento)
                </li>
                <li>Notificar sobre questões de segurança ou violações</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                3.4. Segurança e Conformidade
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Detectar e prevenir fraudes, abusos e atividades ilegais
                </li>
                <li>Cumprir obrigações legais e regulatórias</li>
                <li>Proteger nossos direitos e os de nossos usuários</li>
                <li>Garantir a segurança da plataforma</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                4. Cookies e Tecnologias de Rastreamento
              </h2>
              <p className="mb-4">
                Utilizamos diferentes tipos de cookies e tecnologias de
                rastreamento:
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                4.1. Tipos de Cookies
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Cookies Essenciais:</strong> Necessários para o
                  funcionamento básico da plataforma (ex.: autenticação,
                  segurança)
                </li>
                <li>
                  <strong>Cookies de Funcionalidade:</strong> Permitem que a
                  plataforma lembre suas escolhas e preferências
                </li>
                <li>
                  <strong>Cookies de Analytics:</strong> Nos ajudam a entender
                  como os usuários interagem com a plataforma
                </li>
                <li>
                  <strong>Cookies de Rastreamento:</strong> Utilizados para
                  rastrear cliques em links e gerar estatísticas
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                4.2. Gerenciamento de Cookies
              </h3>
              <p className="mb-4">
                Você pode gerenciar suas preferências de cookies através das
                configurações do seu navegador. No entanto, desabilitar certos
                cookies pode afetar a funcionalidade do serviço.
              </p>
              <p>
                Também utilizamos tecnologias como pixels de rastreamento e
                local storage para fornecer funcionalidades de analytics e
                melhorar sua experiência.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                5. Compartilhamento de Dados
              </h2>
              <p className="mb-4">
                Compartilhamos seus dados apenas nas seguintes circunstâncias:
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                5.1. Provedores de Serviços Essenciais
              </h3>
              <p className="mb-4">
                Compartilhamos dados com provedores terceirizados que nos ajudam
                a operar a plataforma:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Gateways de Pagamento:</strong> Para processar
                  pagamentos e gerenciar assinaturas (ex.: Stripe, PayPal)
                </li>
                <li>
                  <strong>Serviços de Hospedagem e Infraestrutura:</strong> Para
                  armazenar e processar dados
                </li>
                <li>
                  <strong>Serviços de Analytics:</strong> Para analisar o uso da
                  plataforma e melhorar nossos serviços
                </li>
                <li>
                  <strong>Provedores de E-mail:</strong> Para enviar
                  comunicações e notificações
                </li>
                <li>
                  <strong>Serviços de Segurança:</strong> Para proteger a
                  plataforma contra fraudes e ataques
                </li>
              </ul>
              <p className="mb-4">
                Todos esses provedores são obrigados a manter a
                confidencialidade de seus dados e usar as informações apenas
                para os fins especificados.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                5.2. Requisitos Legais
              </h3>
              <p className="mb-4">
                Podemos divulgar seus dados se exigido por lei, ordem judicial,
                processo legal ou solicitação governamental, ou se acreditarmos
                que a divulgação é necessária para:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Cumprir obrigações legais</li>
                <li>Proteger nossos direitos, propriedade ou segurança</li>
                <li>Proteger os direitos e segurança de nossos usuários</li>
                <li>Prevenir ou investigar atividades ilegais</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                5.3. Transferências de Negócio
              </h3>
              <p className="mb-4">
                Em caso de fusão, aquisição, reestruturação ou venda de ativos,
                seus dados podem ser transferidos como parte da transação.
                Notificaremos os usuários sobre qualquer mudança de propriedade
                ou uso de dados pessoais.
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                5.4. Conteúdo Público
              </h3>
              <p>
                Informações que você torna públicas em sua página de portfólio
                (como links, projetos e descrições) são visíveis para qualquer
                pessoa que acesse sua página. Você é responsável pelo conteúdo
                que escolhe tornar público.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                6. Segurança das Informações
              </h2>
              <p className="mb-4">
                Implementamos medidas de segurança técnicas e organizacionais
                para proteger seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Criptografia:</strong> Utilizamos criptografia SSL/TLS
                  para proteger dados em trânsito e criptografia para dados
                  sensíveis em repouso
                </li>
                <li>
                  <strong>Autenticação Segura:</strong> Senhas são armazenadas
                  usando hash seguro e não podem ser recuperadas em texto plano
                </li>
                <li>
                  <strong>Controles de Acesso:</strong> Limitamos o acesso a
                  dados pessoais apenas a funcionários e prestadores de serviços
                  que precisam das informações para realizar seu trabalho
                </li>
                <li>
                  <strong>Monitoramento:</strong> Monitoramos continuamente a
                  plataforma para detectar e prevenir acessos não autorizados,
                  violações de segurança e atividades suspeitas
                </li>
                <li>
                  <strong>Backups Seguros:</strong> Realizamos backups regulares
                  dos dados para garantir a recuperação em caso de incidentes
                </li>
                <li>
                  <strong>Atualizações de Segurança:</strong> Mantemos nossos
                  sistemas atualizados com as últimas correções de segurança
                </li>
              </ul>
              <p className="mb-4">
                Apesar de nossos esforços, nenhum método de transmissão ou
                armazenamento é 100% seguro. Você também é responsável por
                manter a confidencialidade de suas credenciais de acesso.
              </p>
              <p>
                Em caso de violação de dados que possa afetar seus dados
                pessoais, notificaremos você e as autoridades competentes
                conforme exigido por lei.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                7. Direitos do Usuário
              </h2>
              <p className="mb-4">
                De acordo com a LGPD, você tem os seguintes direitos em relação
                aos seus dados pessoais:
              </p>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                7.1. Direitos Disponíveis
              </h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>Acesso:</strong> Solicitar uma cópia dos dados
                  pessoais que mantemos sobre você
                </li>
                <li>
                  <strong>Correção:</strong> Solicitar a correção de dados
                  incompletos, inexatos ou desatualizados
                </li>
                <li>
                  <strong>Exclusão:</strong> Solicitar a exclusão de dados
                  pessoais quando não forem mais necessários ou quando você
                  revogar seu consentimento
                </li>
                <li>
                  <strong>Portabilidade:</strong> Solicitar a transferência de
                  seus dados para outro prestador de serviços
                </li>
                <li>
                  <strong>Revogação de Consentimento:</strong> Revogar seu
                  consentimento para o processamento de dados quando o
                  tratamento for baseado em consentimento
                </li>
                <li>
                  <strong>Oposição:</strong> Opor-se ao processamento de seus
                  dados em certas circunstâncias
                </li>
                <li>
                  <strong>Informação:</strong> Obter informações sobre entidades
                  públicas e privadas com as quais compartilhamos dados
                </li>
                <li>
                  <strong>Revisão de Decisões Automatizadas:</strong> Solicitar
                  a revisão de decisões tomadas exclusivamente com base em
                  processamento automatizado
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 text-foreground">
                7.2. Como Exercer Seus Direitos
              </h3>
              <p className="mb-4">
                Para exercer qualquer um desses direitos, entre em contato
                conosco através do e-mail de privacidade ou pelo canal de
                atendimento disponível. Responderemos sua solicitação no prazo
                de até 15 (quinze) dias úteis.
              </p>
              <p>
                Podemos solicitar informações adicionais para verificar sua
                identidade antes de processar sua solicitação, para proteger sua
                privacidade e segurança.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                8. Retenção e Exclusão de Dados
              </h2>
              <p className="mb-4">
                <strong>Retenção:</strong> Mantemos seus dados pessoais pelo
                tempo necessário para:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Fornecer nossos serviços enquanto sua conta estiver ativa
                </li>
                <li>Cumprir obrigações legais, contábeis e fiscais</li>
                <li>Resolver disputas e fazer cumprir nossos acordos</li>
                <li>Detectar e prevenir fraudes e abusos</li>
              </ul>
              <p className="mb-4">
                <strong>Exclusão:</strong> Quando você solicita a exclusão de
                sua conta, excluímos permanentemente seus dados pessoais,
                conteúdo e links, exceto quando:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Há uma obrigação legal de retenção (ex.: dados fiscais,
                  registros de transações)
                </li>
                <li>
                  Os dados são necessários para resolver disputas ou fazer
                  cumprir acordos
                </li>
                <li>
                  Os dados foram anonimizados e não podem mais ser associados a
                  você
                </li>
              </ul>
              <p>
                Dados anonimizados ou agregados podem ser mantidos
                indefinidamente para fins de análise e melhoria do serviço.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                9. Menores de Idade
              </h2>
              <p className="mb-4">
                O IndieHub é destinado a usuários com 18 anos ou mais. Não
                coletamos intencionalmente dados pessoais de menores de 18 anos
                sem o consentimento dos pais ou responsáveis legais.
              </p>
              <p>
                Se tomarmos conhecimento de que coletamos dados de um menor sem
                o consentimento apropriado, tomaremos medidas para excluir essas
                informações imediatamente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                10. Transferências Internacionais de Dados
              </h2>
              <p className="mb-4">
                Seus dados podem ser armazenados e processados em servidores
                localizados fora do Brasil. Ao usar o IndieHub, você consente
                com a transferência de seus dados para esses locais.
              </p>
              <p>
                Garantimos que todas as transferências internacionais de dados
                sejam realizadas de acordo com as leis de proteção de dados
                aplicáveis e que medidas adequadas de segurança sejam
                implementadas.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                11. Alterações na Política de Privacidade
              </h2>
              <p className="mb-4">
                Podemos atualizar esta Política de Privacidade periodicamente
                para refletir mudanças em nossas práticas, serviços ou
                requisitos legais. Alterações significativas serão comunicadas
                através de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Notificação por e-mail para o endereço cadastrado em sua conta
                </li>
                <li>Aviso destacado em nossa plataforma</li>
                <li>
                  Atualização da data de "Última atualização" no topo desta
                  página
                </li>
              </ul>
              <p className="mb-4">
                Recomendamos que você revise esta política periodicamente para
                estar ciente de como protegemos seus dados.
              </p>
              <p>
                O uso continuado do serviço após as alterações constitui sua
                aceitação da política atualizada.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">
                12. Contato do DPO e Canal de Privacidade
              </h2>
              <p className="mb-4">
                Se você tiver dúvidas, preocupações ou solicitações relacionadas
                a esta Política de Privacidade ou ao tratamento de seus dados
                pessoais, entre em contato conosco através de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <strong>E-mail de Privacidade/DPO:</strong> [INSERIR E-MAIL DE
                  PRIVACIDADE]
                </li>
                <li>
                  <strong>E-mail de Suporte:</strong> [INSERIR E-MAIL DE
                  SUPORTE]
                </li>
                <li>
                  <strong>Endereço Comercial:</strong> [INSERIR ENDEREÇO
                  COMERCIAL]
                </li>
                <li>
                  <strong>Canal de Atendimento:</strong> [INSERIR CANAL DE
                  ATENDIMENTO]
                </li>
              </ul>
              <p className="mb-4">
                Você também tem o direito de apresentar uma reclamação à
                Autoridade Nacional de Proteção de Dados (ANPD) se acreditar que
                o tratamento de seus dados pessoais viola a legislação
                aplicável.
              </p>
              <p>
                Estamos comprometidos em responder suas solicitações de forma
                rápida e adequada, garantindo a proteção de seus direitos de
                privacidade.
              </p>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
