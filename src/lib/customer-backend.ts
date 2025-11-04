// Simple backend service for customer orders and transactions
// In a real application, this would connect to your database

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  sku?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerEmail: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Transaction {
  id: string;
  orderId: string;
  customerId: string;
  date: string;
  amount: number;
  type: 'payment' | 'refund';
  method: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

class CustomerBackendService {
  private orders: Order[] = [
    {
      id: "ORD-2025-001",
      customerId: "customer_1",
      customerEmail: "customer@example.com",
      date: "2025-11-01T10:30:00Z",
      status: "delivered",
      total: 1250.00,
      items: [
        { name: "Steel Beam 6m", quantity: 2, price: 400.00, sku: "SB-6M-001" },
        { name: "Construction Bolts Pack", quantity: 5, price: 90.00, sku: "CB-PACK-50" }
      ],
      trackingNumber: "TK123456789",
      estimatedDelivery: "2025-11-03T15:00:00Z",
      shippingAddress: {
        street: "123 Construction Ave",
        city: "Builder City",
        state: "BC",
        zipCode: "12345",
        country: "USA"
      }
    },
    {
      id: "ORD-2025-002",
      customerId: "customer_1",
      customerEmail: "customer@example.com",
      date: "2025-10-28T14:20:00Z",
      status: "shipped",
      total: 850.00,
      items: [
        { name: "Power Drill Professional", quantity: 1, price: 350.00, sku: "PD-PRO-001" },
        { name: "Drill Bit Set Premium", quantity: 2, price: 250.00, sku: "DBS-PREM-20" }
      ],
      trackingNumber: "TK987654321",
      estimatedDelivery: "2025-11-05T16:00:00Z"
    },
    {
      id: "ORD-2025-003",
      customerId: "customer_1",
      customerEmail: "customer@example.com",
      date: "2025-10-25T09:15:00Z",
      status: "processing",
      total: 2100.00,
      items: [
        { name: "Concrete Mixer Industrial", quantity: 1, price: 2100.00, sku: "CM-IND-500L" }
      ]
    }
  ];

  private transactions: Transaction[] = [
    {
      id: "TXN-2025-001",
      orderId: "ORD-2025-001",
      customerId: "customer_1",
      date: "2025-11-01T10:35:00Z",
      amount: 1250.00,
      type: "payment",
      method: "Credit Card",
      status: "completed",
      reference: "CC-4532-****-1234"
    },
    {
      id: "TXN-2025-002",
      orderId: "ORD-2025-002",
      customerId: "customer_1",
      date: "2025-10-28T14:25:00Z",
      amount: 850.00,
      type: "payment",
      method: "PayPal",
      status: "completed",
      reference: "PP-TXN-ABC123XYZ"
    },
    {
      id: "TXN-2025-003",
      orderId: "ORD-2025-003",
      customerId: "customer_1",
      date: "2025-10-25T09:20:00Z",
      amount: 2100.00,
      type: "payment",
      method: "Bank Transfer",
      status: "pending",
      reference: "BT-REF-789456123"
    }
  ];

  // Get orders for a specific customer
  async getCustomerOrders(customerId: string, filters?: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }): Promise<Order[]> {
    let filteredOrders = this.orders.filter(order => order.customerId === customerId);

    if (filters) {
      if (filters.status && filters.status !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === filters.status);
      }

      if (filters.dateFrom) {
        filteredOrders = filteredOrders.filter(order => order.date >= filters.dateFrom!);
      }

      if (filters.dateTo) {
        filteredOrders = filteredOrders.filter(order => order.date <= filters.dateTo!);
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredOrders = filteredOrders.filter(order =>
          order.id.toLowerCase().includes(searchLower) ||
          order.items.some(item => item.name.toLowerCase().includes(searchLower))
        );
      }
    }

    return filteredOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Get transactions for a specific customer
  async getCustomerTransactions(customerId: string, filters?: {
    status?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
    search?: string;
  }): Promise<Transaction[]> {
    let filteredTransactions = this.transactions.filter(transaction => transaction.customerId === customerId);

    if (filters) {
      if (filters.status && filters.status !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.status === filters.status);
      }

      if (filters.type && filters.type !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.type === filters.type);
      }

      if (filters.dateFrom) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.date >= filters.dateFrom!);
      }

      if (filters.dateTo) {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.date <= filters.dateTo!);
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredTransactions = filteredTransactions.filter(transaction =>
          transaction.id.toLowerCase().includes(searchLower) ||
          transaction.orderId.toLowerCase().includes(searchLower) ||
          transaction.reference?.toLowerCase().includes(searchLower)
        );
      }
    }

    return filteredTransactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  // Get a specific order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    const order = this.orders.find(order => order.id === orderId);
    return order || null;
  }

  // Get customer statistics
  async getCustomerStats(customerId: string): Promise<{
    totalOrders: number;
    totalSpent: number;
    pendingOrders: number;
    lastOrderDate?: string;
  }> {
    const customerOrders = this.orders.filter(order => order.customerId === customerId);
    const completedTransactions = this.transactions.filter(
      transaction => transaction.customerId === customerId && transaction.status === 'completed'
    );

    const totalSpent = completedTransactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    const pendingOrders = customerOrders.filter(order => ['pending', 'processing'].includes(order.status)).length;
    const lastOrder = customerOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    return {
      totalOrders: customerOrders.length,
      totalSpent,
      pendingOrders,
      lastOrderDate: lastOrder?.date
    };
  }

  // Update order status (for admin use)
  async updateOrderStatus(orderId: string, status: Order['status'], trackingNumber?: string): Promise<boolean> {
    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) return false;

    this.orders[orderIndex].status = status;
    if (trackingNumber) {
      this.orders[orderIndex].trackingNumber = trackingNumber;
    }

    return true;
  }

  // Create a new order (simplified)
  async createOrder(orderData: Omit<Order, 'id' | 'date'>): Promise<string> {
    const orderId = `ORD-${new Date().getFullYear()}-${String(this.orders.length + 1).padStart(3, '0')}`;
    
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      ...orderData
    };

    this.orders.push(newOrder);

    // Create corresponding transaction
    const transactionId = `TXN-${new Date().getFullYear()}-${String(this.transactions.length + 1).padStart(3, '0')}`;
    const newTransaction: Transaction = {
      id: transactionId,
      orderId,
      customerId: orderData.customerId,
      date: new Date().toISOString(),
      amount: orderData.total,
      type: 'payment',
      method: 'Credit Card', // Default method
      status: 'pending'
    };

    this.transactions.push(newTransaction);

    return orderId;
  }
}

// Export singleton instance
export const customerBackend = new CustomerBackendService();

// Helper functions for formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
};

export const getStatusDisplayName = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1).replace(/([A-Z])/g, ' $1');
};