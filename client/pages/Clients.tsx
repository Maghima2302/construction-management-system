import { Layout } from "@/components/Layout";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Plus, MoreHorizontal, Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";

interface Client {
  id: string;
  name: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  location: string;
  status: "active" | "inactive";
  projectsCount: number;
  lastContact: string;
}

const clientsData: Client[] = [
  {
    id: "1",
    name: "James Mitchell",
    company: "GreenBuild Construction",
    contact: "Project Manager",
    email: "james.mitchell@greenbuild.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    status: "active",
    projectsCount: 4,
    lastContact: "2 days ago",
  },
  {
    id: "2",
    name: "Sarah Chen",
    company: "Urban Architects Ltd",
    contact: "Principal Architect",
    email: "sarah.chen@urbanarch.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    status: "active",
    projectsCount: 3,
    lastContact: "1 week ago",
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    company: "Apex Engineering",
    contact: "Chief Engineer",
    email: "michael.r@apexeng.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    status: "active",
    projectsCount: 5,
    lastContact: "3 days ago",
  },
  {
    id: "4",
    name: "David Thompson",
    company: "Heritage Restoration",
    contact: "Owner",
    email: "david@heritagerestore.com",
    phone: "+1 (555) 456-7890",
    location: "Boston, MA",
    status: "inactive",
    projectsCount: 2,
    lastContact: "2 months ago",
  },
  {
    id: "5",
    name: "Emily Wong",
    company: "Pacific Developments",
    contact: "Development Director",
    email: "emily.wong@pacificdev.com",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    status: "active",
    projectsCount: 6,
    lastContact: "1 day ago",
  },
  {
    id: "6",
    name: "Robert Garcia",
    company: "Infrastructure Solutions",
    contact: "VP Operations",
    email: "rgarcia@infrasol.com",
    phone: "+1 (555) 678-9012",
    location: "Houston, TX",
    status: "active",
    projectsCount: 3,
    lastContact: "1 week ago",
  },
];

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || client.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Clients</h1>
              <p className="text-muted-foreground">Manage your client relationships and communications</p>
            </div>
            <button className="flex items-center gap-2 bg-accent hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Plus size={20} />
              Add New Client
            </button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="glass-card p-4 rounded-xl mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted/30 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white dark:focus:bg-slate-800 transition-colors"
            />
          </div>

          <div className="flex gap-2">
            {["all", "active", "inactive"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as "all" | "active" | "inactive")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? "bg-accent text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Clients Table */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 px-6 py-4 border-b border-border bg-muted/30 font-semibold text-sm text-muted-foreground">
                <div>Client</div>
                <div>Company</div>
                <div>Location</div>
                <div>Status</div>
                <div className="text-right">Projects</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client)}
                      className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer items-center"
                    >
                      <div>
                        <p className="font-medium text-foreground">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.contact}</p>
                      </div>

                      <div>
                        <p className="text-sm text-foreground">{client.company}</p>
                      </div>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        {client.location}
                      </div>

                      <div>
                        <StatusBadge status={client.status} />
                      </div>

                      <div className="text-right flex items-center justify-end gap-3">
                        <span className="font-semibold text-foreground">{client.projectsCount}</span>
                        <button className="p-1 rounded hover:bg-muted transition-colors">
                          <MoreHorizontal size={16} className="text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-5 p-12 text-center">
                    <p className="text-muted-foreground">No clients found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Client Detail Panel */}
          <div className="lg:col-span-1">
            {selectedClient ? (
              <div className="glass-card p-6 rounded-xl sticky top-24">
                <div className="mb-6 pb-4 border-b border-border">
                  <h3 className="text-lg font-bold text-foreground mb-1">{selectedClient.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedClient.contact}</p>
                </div>

                {/* Company Info */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Company</h4>
                  <p className="text-sm text-foreground">{selectedClient.company}</p>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Status</h4>
                  <StatusBadge status={selectedClient.status} />
                </div>

                {/* Contact Info */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Contact</h4>
                  <div className="space-y-3">
                    <a
                      href={`mailto:${selectedClient.email}`}
                      className="flex items-center gap-2 text-sm text-accent hover:text-orange-600 transition-colors"
                    >
                      <Mail size={16} />
                      {selectedClient.email}
                    </a>
                    <a
                      href={`tel:${selectedClient.phone}`}
                      className="flex items-center gap-2 text-sm text-accent hover:text-orange-600 transition-colors"
                    >
                      <Phone size={16} />
                      {selectedClient.phone}
                    </a>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} />
                      {selectedClient.location}
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Projects</h4>
                  <p className="text-2xl font-bold text-accent">{selectedClient.projectsCount}</p>
                </div>

                {/* Last Contact */}
                <div className="pb-6 border-b border-border">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Last Contact</h4>
                  <p className="text-sm text-foreground">{selectedClient.lastContact}</p>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <button className="w-full py-2 px-4 bg-accent text-white rounded-lg font-medium hover:bg-orange-600 transition-colors">
                    Send Message
                  </button>
                  <button className="w-full py-2 px-4 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors">
                    View Projects
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 rounded-xl text-center">
                <p className="text-muted-foreground">Select a client to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
