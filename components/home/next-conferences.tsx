import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { generateTimeAndDateLink } from "@/lib/utils"
import initTranslations from "@/app/i18n"
import { fetchData } from "@/lib/fetchs"
import { Conference } from "@/lib/types"

export async function NextConferences({ locale }: { locale: string }) {
  const upcomingConferences = await fetchData(
    `http://localhost:3000/api/conferences`
  )

  const currentDate = new Date()

  const { t } = await initTranslations(locale, ["home", "common"])

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:flex gap-4 md:gap-0 justify-between md:items-center mb-4">
        <CardTitle>{t("conferences-card")}</CardTitle>
        <Link href={"/conferences"}>
          <Button>{t("common:see-more")}</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <Table className="mt-8 mb-8 w-full">
          <TableCaption>{t("common:conference-table-caption")}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                {t("common:conference-table-head-conference")}
              </TableHead>
              <TableHead>{t("common:conference-table-head-date")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {upcomingConferences.conferences.map((conference: Conference) => (
              <TableRow
                key={conference.id}
                className={`${
                  new Date(conference.release_date) > currentDate
                    ? ""
                    : "line-through"
                }`}
              >
                <TableCell className="font-medium">{conference.name}</TableCell>
                <TableCell>
                  <Link
                    target="_blank"
                    href={generateTimeAndDateLink(
                      conference.release_date,
                      conference.time
                    )}
                  >
                    {`${conference.release_date} ${
                      conference.time ? `| ${conference.time} UTC` : "| TBA"
                    }`}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
