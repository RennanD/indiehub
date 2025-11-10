import { Spline } from "lucide-react";
import Link from "next/link";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="w-full border-b border-text-muted/20">
        <div className="w-full max-w-4xl py-5 mx-auto px-5">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="flex items-center rounded-md p-1 bg-primary">
              <Spline className="size-4 text-accent" />
            </div>
            <span className="text-accent font-bold">IndieHub</span>
          </Link>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-5 py-10">
        <article className="prose prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-2 text-accent">Termos de Uso</h1>
          <p className="text-text-muted mb-8">
            Última atualização:{" "}
            {new Date().toLocaleDateString("pt-BR", {
              month: "long",
              year: "numeric",
            })}
          </p>

          <section className="space-y-6 text-text-muted">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                1. Introdução e Aceitação dos Termos
              </h2>
              <p className="mb-4">
                Bem-vindo ao <strong>IndieHub</strong>. Estes Termos de Uso
                ("Termos") regem seu acesso e uso da plataforma IndieHub, um
                serviço digital que permite aos usuários criar páginas de
                portfólio e compartilhar links curtos de seus projetos, com
                rastreamento de visitas e analytics.
              </p>
              <p className="mb-4">
                Ao acessar, usar ou criar uma conta no IndieHub, você concorda
                em cumprir e estar vinculado a estes Termos. Se você não
                concorda com qualquer parte destes Termos, não deve utilizar
                nossos serviços.
              </p>
              <p>
                Estes Termos constituem um acordo legal entre você e o IndieHub.
                Recomendamos que você leia atentamente este documento antes de
                utilizar nossos serviços.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                2. Descrição do Serviço
              </h2>
              <p className="mb-4">
                O IndieHub é uma plataforma de software como serviço (SaaS) que
                oferece:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Criação e personalização de páginas de portfólio para exibir
                  projetos
                </li>
                <li>
                  Geração de links curtos personalizados para seus projetos
                </li>
                <li>
                  Rastreamento de visitas e estatísticas de acesso aos links
                </li>
                <li>
                  Analytics e relatórios sobre o desempenho dos projetos
                  compartilhados
                </li>
                <li>Ferramentas de gerenciamento de conteúdo e links</li>
              </ul>
              <p>
                Reservamo-nos o direito de modificar, suspender ou descontinuar
                qualquer aspecto do serviço a qualquer momento, com ou sem aviso
                prévio.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                3. Cadastro e Conta do Usuário
              </h2>
              <p className="mb-4">
                Para utilizar os serviços do IndieHub, você precisa criar uma
                conta fornecendo informações precisas, atualizadas e completas,
                incluindo:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Nome completo ou razão social</li>
                <li>Endereço de e-mail válido</li>
                <li>Senha segura</li>
                <li>Outras informações solicitadas durante o cadastro</li>
              </ul>
              <p className="mb-4">Você é responsável por:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Manter a confidencialidade de suas credenciais de acesso
                </li>
                <li>Todas as atividades que ocorram sob sua conta</li>
                <li>
                  Notificar-nos imediatamente sobre qualquer uso não autorizado
                  de sua conta
                </li>
                <li>
                  Garantir que todas as informações fornecidas sejam verdadeiras
                  e precisas
                </li>
              </ul>
              <p>
                Você não pode criar contas múltiplas, transferir sua conta para
                terceiros ou usar contas de outros usuários sem autorização.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                4. Planos, Pagamentos e Renovação
              </h2>
              <p className="mb-4">
                O IndieHub oferece planos de assinatura com diferentes níveis de
                funcionalidades e recursos. Os preços, recursos e limites de
                cada plano estão disponíveis em nossa página de planos.
              </p>
              <p className="mb-4">
                <strong>Pagamento:</strong> Os pagamentos são processados
                através de gateways de pagamento seguros. Ao assinar um plano,
                você autoriza o IndieHub a cobrar o valor da assinatura no
                método de pagamento fornecido.
              </p>
              <p className="mb-4">
                <strong>Renovação Automática:</strong> As assinaturas são
                renovadas automaticamente no final de cada período de cobrança
                (mensal, trimestral ou anual, conforme o plano escolhido), a
                menos que você cancele antes da data de renovação.
              </p>
              <p className="mb-4">
                <strong>Alterações de Preço:</strong> Reservamo-nos o direito de
                modificar os preços dos planos a qualquer momento. Alterações de
                preço serão comunicadas com pelo menos 30 dias de antecedência e
                não se aplicarão ao período atual de assinatura, apenas às
                renovações futuras.
              </p>
              <p>
                <strong>Impostos:</strong> Você é responsável por todos os
                impostos aplicáveis relacionados ao uso do serviço, conforme a
                legislação vigente.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                5. Política de Reembolso
              </h2>
              <p className="mb-4">
                De acordo com o Código de Defesa do Consumidor (Lei nº
                8.078/90), você tem direito a solicitar o reembolso integral do
                valor pago pela assinatura{" "}
                <strong>
                  em até 7 (sete) dias corridos a partir da data da primeira
                  assinatura
                </strong>
                , independentemente do motivo.
              </p>
              <p className="mb-4">
                Para solicitar o reembolso, você deve entrar em contato conosco
                através do e-mail de suporte ou pelo canal de atendimento
                disponível em nossa plataforma, informando sua solicitação de
                cancelamento e reembolso.
              </p>
              <p className="mb-4">
                O reembolso será processado no mesmo método de pagamento
                utilizado na assinatura, no prazo de até 10 (dez) dias úteis
                após a confirmação da solicitação.
              </p>
              <p>
                Após o período de 7 dias, não serão realizados reembolsos,
                exceto em casos de erro do sistema ou violação destes Termos por
                parte do IndieHub.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                6. Cancelamento e Exclusão de Conta
              </h2>
              <p className="mb-4">
                <strong>Cancelamento pela Parte do Usuário:</strong> Você pode
                cancelar sua assinatura a qualquer momento através das
                configurações da sua conta ou entrando em contato com nosso
                suporte. O cancelamento entrará em vigor no final do período de
                cobrança atual, e você continuará tendo acesso aos serviços até
                o final do período já pago.
              </p>
              <p className="mb-4">
                <strong>Exclusão de Conta:</strong> Você pode solicitar a
                exclusão permanente de sua conta e dados a qualquer momento. Ao
                excluir sua conta, todos os seus dados, links, projetos e
                estatísticas serão permanentemente removidos e não poderão ser
                recuperados.
              </p>
              <p className="mb-4">
                <strong>Cancelamento pela Parte do IndieHub:</strong>{" "}
                Reservamo-nos o direito de suspender ou encerrar sua conta
                imediatamente, sem aviso prévio, se você violar estes Termos,
                usar o serviço de forma ilegal ou fraudulenta, ou se sua conta
                estiver inativa por um período prolongado.
              </p>
              <p>
                Após o cancelamento ou exclusão, não haverá reembolso
                proporcional para o período restante, exceto conforme disposto
                na seção de Política de Reembolso.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                7. Propriedade Intelectual
              </h2>
              <p className="mb-4">
                <strong>Conteúdo do Usuário:</strong> Você mantém todos os
                direitos de propriedade intelectual sobre o conteúdo que criar,
                compartilhar ou enviar através do IndieHub, incluindo textos,
                imagens, links e projetos exibidos em sua página de portfólio.
              </p>
              <p className="mb-4">
                Ao usar o IndieHub, você nos concede uma licença não exclusiva,
                mundial e livre de royalties para usar, armazenar, exibir e
                processar seu conteúdo exclusivamente para fornecer e melhorar
                nossos serviços.
              </p>
              <p className="mb-4">
                <strong>Propriedade do IndieHub:</strong> Todos os direitos de
                propriedade intelectual relacionados à plataforma IndieHub,
                incluindo software, design, logotipos, marcas, textos e
                funcionalidades, são de propriedade exclusiva do IndieHub ou de
                seus licenciadores.
              </p>
              <p>
                Você não pode copiar, modificar, distribuir, vender ou alugar
                qualquer parte do serviço sem autorização expressa por escrito.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                8. Limitação de Responsabilidade
              </h2>
              <p className="mb-4">
                O IndieHub é fornecido "como está" e "conforme disponível", sem
                garantias de qualquer tipo, expressas ou implícitas, incluindo,
                mas não se limitando a, garantias de comercialização, adequação
                a uma finalidade específica ou não violação.
              </p>
              <p className="mb-4">
                Não garantimos que o serviço será ininterrupto, livre de erros,
                seguro ou livre de vírus ou outros componentes prejudiciais.
                Você é responsável por fazer backup de seu conteúdo e dados.
              </p>
              <p className="mb-4">
                Em nenhuma circunstância o IndieHub, seus diretores,
                funcionários ou parceiros serão responsáveis por danos
                indiretos, incidentais, especiais, consequenciais ou punitivos,
                incluindo perda de lucros, dados, uso ou outras perdas
                intangíveis, resultantes do uso ou incapacidade de usar o
                serviço.
              </p>
              <p>
                Nossa responsabilidade total em relação a qualquer reclamação
                não excederá o valor pago por você nos últimos 12 meses pelo uso
                do serviço.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                9. Uso Aceitável
              </h2>
              <p className="mb-4">Você concorda em não usar o IndieHub para:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>Atividades ilegais ou que violem direitos de terceiros</li>
                <li>
                  Enviar spam, conteúdo malicioso ou links para sites maliciosos
                </li>
                <li>
                  Violar leis de propriedade intelectual, privacidade ou outros
                  direitos
                </li>
                <li>
                  Interferir ou tentar interferir no funcionamento do serviço
                </li>
                <li>Acessar ou tentar acessar contas de outros usuários</li>
                <li>Usar o serviço para fins fraudulentos ou enganosos</li>
                <li>
                  Compartilhar conteúdo que seja ofensivo, discriminatório,
                  difamatório ou que viole leis aplicáveis
                </li>
              </ul>
              <p>
                A violação destas regras pode resultar na suspensão ou
                encerramento imediato de sua conta, sem direito a reembolso.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                10. Alterações nos Termos
              </h2>
              <p className="mb-4">
                Reservamo-nos o direito de modificar estes Termos a qualquer
                momento. Alterações significativas serão comunicadas através de:
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
                Se você não concordar com as alterações, deve cancelar sua conta
                e interromper o uso do serviço. O uso continuado do serviço após
                as alterações constitui sua aceitação dos novos Termos.
              </p>
              <p>
                Recomendamos que você revise periodicamente estes Termos para
                estar ciente de quaisquer atualizações.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                11. Lei Aplicável e Foro
              </h2>
              <p className="mb-4">
                Estes Termos são regidos pelas leis da República Federativa do
                Brasil. Qualquer disputa relacionada a estes Termos ou ao uso do
                serviço será resolvida no foro da comarca onde se encontra a
                sede do IndieHub, renunciando as partes a qualquer outro, por
                mais privilegiado que seja.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                12. Disposições Gerais
              </h2>
              <p className="mb-4">
                <strong>Integridade do Contrato:</strong> Se qualquer disposição
                destes Termos for considerada inválida ou inexequível, as demais
                disposições permanecerão em pleno vigor e efeito.
              </p>
              <p className="mb-4">
                <strong>Renúncia:</strong> A falha do IndieHub em exercer ou
                fazer valer qualquer direito ou disposição destes Termos não
                constitui uma renúncia a tal direito ou disposição.
              </p>
              <p className="mb-4">
                <strong>Cessão:</strong> Você não pode ceder ou transferir estes
                Termos ou seus direitos sob estes Termos sem nosso consentimento
                prévio por escrito. O IndieHub pode ceder estes Termos a
                qualquer momento.
              </p>
              <p>
                <strong>Acordo Completo:</strong> Estes Termos, juntamente com
                nossa Política de Privacidade, constituem o acordo completo
                entre você e o IndieHub em relação ao uso do serviço.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-accent">
                13. Contato para Suporte e Dúvidas
              </h2>
              <p className="mb-4">
                Se você tiver dúvidas, preocupações ou precisar de suporte
                relacionado a estes Termos ou ao uso do IndieHub, entre em
                contato conosco através de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
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
              <p className="mt-4">
                Nosso time de suporte está disponível para ajudá-lo e responder
                suas dúvidas no menor tempo possível.
              </p>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
