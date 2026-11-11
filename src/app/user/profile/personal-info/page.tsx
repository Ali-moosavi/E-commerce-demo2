import { requireServerSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import PersonalInfoForm from "@/components/dashboard/PersonalInfoForm"

export default async function PersonalInfoPage() {
  const session = await requireServerSession()
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: session.user.id },
    select: { email: true, firstName: true, lastName: true },
  })

  return <PersonalInfoForm user={user} />
}
