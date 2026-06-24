"use client";

import { Briefcase, MapPin, Clock, Users } from "lucide-react";

const openings = [
  { title: "Senior Frontend Engineer", dept: "Engineering", location: "Nairobi", type: "Full-time" },
  { title: "Product Designer", dept: "Design", location: "Remote", type: "Full-time" },
  { title: "Warehouse Operations Lead", dept: "Operations", location: "Mombasa", type: "Full-time" },
  { title: "Customer Success Associate", dept: "Support", location: "Nairobi", type: "Full-time" },
  { title: "Digital Marketing Manager", dept: "Marketing", location: "Remote", type: "Full-time" },
  { title: "Data Analyst", dept: "Analytics", location: "Nairobi", type: "Contract" },
];

export default function CareersPage() {
  return (
    <div className="py-6 md:py-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Careers at Thomex</h1>
        <p className="text-muted-foreground">Join the team building East Africa's best marketplace.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <Users className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">50+ Team</p>
          <p className="text-xs text-muted-foreground">Across East Africa</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <Briefcase className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">6 Open Roles</p>
          <p className="text-xs text-muted-foreground">Hiring now</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">Nairobi HQ</p>
          <p className="text-xs text-muted-foreground">Westlands</p>
        </div>
        <div className="text-center p-4 bg-muted/30 rounded-xl">
          <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-sm font-semibold">Flexible</p>
          <p className="text-xs text-muted-foreground">Remote options</p>
        </div>
      </div>

      <div className="bg-background border border-border rounded-2xl overflow-hidden">
        <div className="px-4 py-3 bg-muted/50 border-b border-border">
          <h2 className="font-semibold text-sm text-foreground">Open Positions</h2>
        </div>
        <div className="divide-y divide-border">
          {openings.map((job, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-3.5 hover:bg-muted/20 transition-colors">
              <div>
                <p className="text-sm font-semibold text-foreground">{job.title}</p>
                <p className="text-xs text-muted-foreground">{job.dept}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {job.type}
                </span>
                <button className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Don't see your role? Send your CV to{" "}
          <a href="mailto:careers@thomex.co.ke" className="text-primary hover:underline">
            careers@thomex.co.ke
          </a>
        </p>
      </div>
    </div>
  );
}