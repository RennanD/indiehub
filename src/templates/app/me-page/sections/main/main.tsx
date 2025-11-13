import {
  Eye,
  FolderArchive,
  Github,
  Instagram,
  Linkedin,
  Save,
  Share,
  Twitter,
} from "lucide-react";
import { Android } from "@/components/ui/android";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MainSection() {
  return (
    <section className="flex flex-1 pb-20 pt-5 md:pt-20">
      <div className="w-full max-w-7xl mx-auto px-5 flex flex-col gap-10 md:flex-row">
        <div className="flex flex-col gap-2 flex-2">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <Avatar className="size-14">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2 flex-1 justify-between">
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">John Doe</h3>
                  <p className="text-sm text-muted-foreground">
                    https://indiehub.site/john-doe
                  </p>
                </div>
                <Button variant="outline" size="icon">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              <InputGroup>
                <InputGroupTextarea placeholder="Conte sobre você" />
                <InputGroupAddon align="block-end">
                  <InputGroupText className="text-muted-foreground text-xs">
                    250 caracteres restantes
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>

              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Instagram className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        type="url"
                        id="instagram"
                        placeholder="https://instagram.com/john-doe"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Github className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        type="url"
                        id="github"
                        placeholder="https://github.com/john-doe"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Label htmlFor="x">X</Label>
                      <Input
                        type="url"
                        id="x"
                        placeholder="https://x.com/john-doe"
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        type="url"
                        id="linkedin"
                        placeholder="https://linkedin.com/in/john-doe"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>

            <CardFooter className="space-x-2">
              <Button>
                <Save className="w-4 h-4" />
                Salvar
              </Button>

              <Button variant="secondary" className="md:hidden">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <FolderArchive className="w-4 h-4" />
                </EmptyMedia>
                <EmptyTitle>Nenhum Projeto</EmptyTitle>
                <EmptyDescription>
                  Você ainda não criou nenhum projeto. Comece criando seu
                  primeiro projeto.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex gap-2">
                  <Button>Criar Projeto</Button>
                </div>
              </EmptyContent>
            </Empty>
          </Card>
        </div>

        <div className="flex-col gap-2 flex-1 hidden md:flex">
          <Android />
        </div>
      </div>
    </section>
  );
}
