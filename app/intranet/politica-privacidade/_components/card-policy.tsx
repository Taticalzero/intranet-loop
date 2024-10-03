import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'
import { ScrollArea } from '@/app/_components/ui/scroll-area'

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Política de Privacidade
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[650px] w-full pr-4">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                A sua privacidade é importante para nós. É política do Loopfibra
                respeitar a sua privacidade em relação a qualquer informação sua
                que possamos coletar no site{' '}
                <a
                  href="https://www.loopfibra.net.br/site/"
                  className="text-primary hover:underline"
                >
                  Loopfibra
                </a>
                , e outros sites que possuímos e operamos.
              </p>
              <p className="text-muted-foreground">
                Solicitamos informações pessoais apenas quando realmente
                precisamos delas para lhe fornecer um serviço. Fazemo-lo por
                meios justos e legais, com o seu conhecimento e consentimento.
                Também informamos por que estamos coletando e como será usado.
              </p>
              <p className="text-muted-foreground">
                Apenas retemos as informações coletadas pelo tempo necessário
                para fornecer o serviço solicitado. Quando armazenamos dados,
                protegemos dentro de meios comercialmente aceitáveis ​​para
                evitar perdas e roubos, bem como acesso, divulgação, cópia, uso
                ou modificação não autorizados.
              </p>
              <p className="text-muted-foreground">
                Não compartilhamos informações de identificação pessoal
                publicamente ou com terceiros, exceto quando exigido por lei.
              </p>
              <p className="text-muted-foreground">
                Você é livre para recusar a nossa solicitação de informações
                pessoais, entendendo que talvez não possamos fornecer alguns dos
                serviços desejados.
              </p>
              <p className="text-muted-foreground">
                O uso continuado de nosso site será considerado como aceitação
                de nossas práticas em torno de privacidade e informações
                pessoais. Se você tiver alguma dúvida sobre como lidamos com
                dados do usuário e informações pessoais, entre em contacto
                connosco.
              </p>
              <h3 className="text-2xl font-semibold mt-6 mb-2">
                Compromisso do Usuário
              </h3>
              <p className="text-muted-foreground">
                O usuário se compromete a fazer uso adequado dos conteúdos e da
                informação que o Loopfibra oferece no site e com caráter
                enunciativo, mas não limitativo:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  A) Não se envolver em atividades que sejam ilegais ou
                  contrárias à boa fé a à ordem pública;
                </li>
                <li>
                  B) Não difundir propaganda ou conteúdo de natureza racista,
                  xenofóbica, pixbet ou azar, qualquer tipo de pornografia
                  ilegal, de apologia ao terrorismo ou contra os direitos
                  humanos;
                </li>
                <li>
                  C) Não causar danos aos sistemas físicos (hardwares) e lógicos
                  (softwares) do Loopfibra, de seus fornecedores ou terceiros,
                  para introduzir ou disseminar vírus informáticos ou quaisquer
                  outros sistemas de hardware ou software que sejam capazes de
                  causar danos anteriormente mencionados.
                </li>
              </ul>
              <h3 className="text-2xl font-semibold mt-6 mb-2">
                Mais informações
              </h3>
              <p className="text-muted-foreground">
                Esperemos que esteja esclarecido e, como mencionado
                anteriormente, se houver algo que você não tem certeza se
                precisa ou não, geralmente é mais seguro deixar os cookies
                ativados, caso interaja com um dos recursos que você usa em
                nosso site.
              </p>
              <p className="text-muted-foreground">
                Esta política é efetiva a 08 de Novembro de 2021.
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
