<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Sales Report</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
        <h1 style="color: #28a745; margin-top: 0;">📊 Daily Sales Report</h1>
    </div>

    <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
        <p>Hello Admin,</p>

        <p>Here is your daily sales report for <strong>{{ $date->format('F j, Y') }}</strong>:</p>

        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><strong>Date:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6;">{{ $date->format('F j, Y') }}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6;"><strong>Total Products Sold:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #dee2e6; font-size: 18px; font-weight: bold; color: #28a745;">{{ number_format($totalProductsSold) }}</td>
                </tr>
                <tr>
                    <td style="padding: 10px;"><strong>Total Revenue:</strong></td>
                    <td style="padding: 10px; font-size: 18px; font-weight: bold; color: #28a745;">${{ number_format($totalRevenue, 2) }}</td>
                </tr>
            </table>
        </div>

        <p> Thank you for using {{ config('app.name') }}.</p>
    </div>

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #dee2e6; text-align: center; color: #6c757d; font-size: 12px;">
        <p>This is an automated daily report from {{ config('app.name') }}.</p>
    </div>
</body>
</html>
