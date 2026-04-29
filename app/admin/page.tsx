"use client";

import { useState, useEffect, useCallback } from "react";
import type { ContactSubmission } from "@/lib/contacts";

const PRODUCT_LABELS: Record<string, string> = {
  ups: "UPS",
  avr: "AVR",
  fc: "FC",
  rectifier: "정류기",
  battery: "배터리",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchContacts = useCallback(async (pw: string) => {
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/contacts", {
      headers: { Authorization: `Bearer ${pw}` },
    });
    setLoading(false);
    if (res.status === 401) {
      setError("비밀번호가 올바르지 않습니다.");
      setToken(null);
      return;
    }
    const data = await res.json();
    setContacts(data);
    setToken(pw);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_token");
    if (saved) fetchContacts(saved);
  }, [fetchContacts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("admin_token", password);
    fetchContacts(password);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("이 문의를 삭제하시겠습니까?")) return;
    const res = await fetch(`/api/admin/contacts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
      if (expanded === id) setExpanded(null);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setToken(null);
    setContacts([]);
    setPassword("");
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow w-full max-w-sm">
          <h1 className="text-xl font-bold text-gray-800 mb-6 text-center">관리자 로그인</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none focus:border-[#1a4fa0]"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#1a4fa0] text-white py-2 rounded hover:bg-[#0d3070] transition-colors"
            >
              {loading ? "확인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">문의 관리</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">총 {contacts.length}건</span>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-gray-800 underline"
            >
              로그아웃
            </button>
          </div>
        </div>

        {contacts.length === 0 ? (
          <div className="bg-white rounded shadow p-10 text-center text-gray-400">
            접수된 문의가 없습니다.
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((c) => (
              <div key={c.id} className="bg-white rounded shadow overflow-hidden">
                <div
                  className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                >
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-semibold text-gray-800">{c.company}</span>
                    <span className="text-sm text-gray-500">{c.manager} ({c.position})</span>
                    <span className="text-sm bg-[#e8eef8] text-[#1a4fa0] px-2 py-0.5 rounded">
                      {PRODUCT_LABELS[c.product] ?? c.product}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs text-gray-400">{formatDate(c.created_at)}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(c.id); }}
                      className="text-xs text-red-500 hover:text-red-700 px-2 py-1 border border-red-300 rounded hover:bg-red-50"
                    >
                      삭제
                    </button>
                    <span className="text-gray-400 text-xs">{expanded === c.id ? "▲" : "▼"}</span>
                  </div>
                </div>

                {expanded === c.id && (
                  <div className="border-t border-gray-200 px-5 py-4 text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <Row label="상호" value={c.company} />
                    <Row label="직책/담당자" value={`${c.position} / ${c.manager}`} />
                    <Row label="전화번호" value={c.tel} />
                    {c.mobile && <Row label="휴대폰" value={c.mobile} />}
                    {c.fax && <Row label="팩스" value={c.fax} />}
                    <Row label="이메일" value={c.email} />
                    <Row label="제품선택" value={PRODUCT_LABELS[c.product] ?? c.product} />
                    {c.input_voltage && <Row label="입력전압" value={c.input_voltage} />}
                    {c.output_voltage && <Row label="출력전압" value={c.output_voltage} />}
                    {c.input_hz && <Row label="입력주파수" value={c.input_hz} />}
                    {c.output_hz && <Row label="출력주파수" value={c.output_hz} />}
                    {c.capacity && <Row label="전격용량" value={c.capacity} />}
                    {c.backup && <Row label="백업시간" value={c.backup} />}
                    {c.message && (
                      <div className="md:col-span-2">
                        <span className="font-medium text-gray-500 mr-2">기타내용</span>
                        <span className="whitespace-pre-wrap">{c.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-medium text-gray-500 mr-2">{label}</span>
      <span>{value}</span>
    </div>
  );
}
