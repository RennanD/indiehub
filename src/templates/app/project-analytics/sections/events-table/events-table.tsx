/** biome-ignore-all lint/correctness/useExhaustiveDependencies: Effect is only run on mount and when cursors change manually */
"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { Loader2 } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

import { useEffect, useState } from "react";

import { UAParser } from "ua-parser-js";

import {
  getProjectAnalyticsPaginated,
  type LinkEvent,
} from "@/actions/project-analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PAGE_SIZE = 10;

export function EventsTable({
  projectId,
  profileSlug,
}: {
  projectId: string;
  profileSlug: string;
}) {
  const [events, setEvents] = useState<LinkEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [cursors, setCursors] = useState<(number | undefined)[]>([undefined]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadEvents = async (cursor?: number) => {
    setLoading(true);
    try {
      const newEvents = await getProjectAnalyticsPaginated(
        profileSlug,
        projectId,
        PAGE_SIZE,
        cursor,
      );
      setEvents(newEvents);
      setHasMore(newEvents.length === PAGE_SIZE);
    } catch (error) {
      console.error("Failed to load events", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents(cursors[0]);
  }, []);

  const handleNext = () => {
    if (!hasMore) return;
    const lastEvent = events[events.length - 1];
    if (lastEvent) {
      const nextCursor = lastEvent.timestamp;
      const nextCursors = [...cursors];
      // Store the cursor for the next page
      nextCursors[currentPage + 1] = nextCursor;

      setCursors(nextCursors);
      setCurrentPage((prev) => prev + 1);
      loadEvents(nextCursor);
    }
  };

  const handlePrevious = () => {
    if (currentPage === 0) return;
    const prevPage = currentPage - 1;
    const prevCursor = cursors[prevPage];
    setCurrentPage(prevPage);
    loadEvents(prevCursor);
  };

  const formatDate = (timestamp: number) => {
    return dayjs(timestamp).fromNow();
  };

  const formatUserAgent = (userAgent: string) => {
    const { browser, os } = UAParser(userAgent);

    return `${browser.name}, ${os.name}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Eventos Recentes</CardTitle>
        <CardDescription>Lista de acessos ao projeto</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Dispositivo</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <div className="flex justify-center items-center w-full">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Carregando...
                    </div>
                  </TableCell>
                </TableRow>
              ) : events.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Nenhum evento encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                events.map((event, index) => (
                  <TableRow key={`${event.timestamp}-${index}`}>
                    <TableCell>{event.shortLinkId || "-"}</TableCell>
                    <TableCell>{event.source || "Direto"}</TableCell>
                    <TableCell>{event.location || "-"}</TableCell>
                    <TableCell title={event.userAgent}>
                      {formatUserAgent(event.userAgent) || "Desconhecido"}
                    </TableCell>
                    <TableCell>{formatDate(event.timestamp)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex items-center justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrevious();
                  }}
                  className={
                    currentPage === 0
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <span className="text-sm text-muted-foreground px-2">
                  Página {currentPage + 1}
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNext();
                  }}
                  className={
                    !hasMore
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardContent>
    </Card>
  );
}
